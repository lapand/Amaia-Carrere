import { contactSchema } from '@/app/schemas/formSchema';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
const { OAuth2Client } = require('google-auth-library');

const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USER, RECIPIENT} = process.env;

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
    return NextResponse.json({ errors: zodErrors });
  }

  // sending mail
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    // console.log(accessToken, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, USER);

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Hôte du serveur SMTP
      // host: 'smtp.gmail.com',
      // port: 587, // 587 : Utilisé pour chiffrage STARTTLS --- 465 : Utilisé pour chiffrage SSL/TLS
      // secure: false, // false pour STARTTLS, true pour SSL/TLS
      auth: {
        type: 'OAuth2',
        user: USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      tls: {
        // Assurez-vous de ne pas ignorer la vérification des certificats en production
        rejectUnauthorized: false
      }
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
      return NextResponse.json({ message: e.message });
    } else {
      console.error('An unexpected error occurred:', e);
      return NextResponse.json({ message: 'An unexpected error occurred' });
    }
  }

  return NextResponse.json({ success: true });
}
