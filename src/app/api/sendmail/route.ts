import { contactSchema } from '@/schemas/formSchema';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  SENDGRID_USER,
  SENDGRID_API_KEY,
  MYMAIL,
  CONTACT_FORM_RECIPIENT,
} from '@/config/config';

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
        user: SENDGRID_USER,
        pass: SENDGRID_API_KEY,
      },
    });

    const { email, subject, content } = result.data;

    const formatContentForHtml = (text: string) => {
      return text
        .split('\n')
        .map((line) => `<p>${line}</p>`)
        .join('');
    };

    const mailOptions = {
      from: `"Amaia Carrere - site web" <${MYMAIL}>`,
      to: CONTACT_FORM_RECIPIENT,
      subject,
      text: `
        Message reçu de : ${email}
        ${content}
      `,
      html: `
        <h3>Message reçu de : ${email}</h3>
        ${formatContentForHtml(content)}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error sending email:', e.message);
      return NextResponse.json({ emailSendingError: e.message });
    } else {
      console.error('An unexpected error occurred:', e);
      return NextResponse.json({
        emailSendingError: 'An unexpected error occurred',
      });
    }
  }

  return NextResponse.json({ success: true });
}
