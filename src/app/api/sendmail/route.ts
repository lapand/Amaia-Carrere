import { contactSchema } from '@/app/schemas/formSchema';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const {USER, API_KEY, MYMAIL} = process.env;

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
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: USER,
        pass: API_KEY,
      },
    });

    const { email, subject, content } = result.data;

    const mailOptions = {
      from: `Amaia Carrere - site web <${MYMAIL}>`,
      to: 'lapand1@outlook.com',
      subject,
      text: `
        Message reçu de : ${email}
        ${content}
      `,
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
