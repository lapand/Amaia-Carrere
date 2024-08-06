import { contactSchema } from '@/app/schemas/formSchema';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

const {USER, RECIPIENT} = process.env;
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
const REDIRECT_URI = process.env.REDIRECT_URI || '';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || '';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req: Request) {
  const body: unknown = await req.json();

  // Zod validation
  const result = contactSchema.safeParse(body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ zodErrors });
  }

  // Sending mail
  try {
    console.debug('Vérification des variables d\'environnement :');
    console.debug('CLIENT_ID:', CLIENT_ID.slice(0, 5) + '...');
    console.debug('CLIENT_SECRET:', CLIENT_SECRET.slice(0, 5) + '...');
    console.debug('REDIRECT_URI:', REDIRECT_URI);
    console.debug('REFRESH_TOKEN:', REFRESH_TOKEN.slice(0, 5) + '...')

    const accessToken = await oAuth2Client.getAccessToken();
    if (!accessToken.token || typeof accessToken.token !== 'string') {
      throw new Error('Invalid access token');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      // Il est important de ne pas ignorer la vérification des certificats en production.
      // On l'utilise ici pdt la phase de dév car l'antivirus re-signe le certificat TLS/SSL émis par le serveur SMTP de google, certificat alors rejeté.
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    const { email, subject, content } = result.data;

    const mailOptions = {
      from: `Amaia Carrere - site web <${USER}>`,
      to: 'lapand@hotmail.fr',
      subject,
      text: content,
      html: `
        <h3>Message reçu de : ${email}</h3>
        <p>${content}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error sending email:', e.message);
      return NextResponse.json({ emailSendingError: e.message });
    } else {
      console.error('An unexpected error occurred:', e);
      return NextResponse.json({ emailSendingError: 'An unexpected error occurred' });
    }
  }

  return NextResponse.json({ success: true });
}
