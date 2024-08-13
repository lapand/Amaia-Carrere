import { contactSchema } from '@/app/schemas/formSchema';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const { USER, API_KEY, MYMAIL } = process.env;

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
      // Il est important de ne pas ignorer la vérification des certificats en production.
      // On l'utilise ici pdt la phase de dév car l'antivirus re-signe le certificat TLS/SSL émis par le serveur SMTP de google, certificat alors rejeté.
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    const { email, subject, content } = result.data;
    const seedList = [
      'elizabeaver@auth.glockdb.com',
      'simonetgrimard@laposte.net',
      'augustinlidermann@t-online.de',
      'andrewheggins@mailo.com',
      'andreablackburn@yandex.ru',
      'williegarciaee@outlook.com',
      'davidvcampbell@aol.com',
      'tinamallahancr@gmail.com',
      'verify79@seznam.cz',
      'b2bdeliver79@mail.com',
      'dannakbond@aol.com',
      'kathleentratliff@gmail.com',
      'alfredohoffman@fastdirectorysubmitter.com',
      'louiepettydr@gmail.com',
      'carloscohenm@freenet.de',
      'martinawm@gemings.awsapps.com',
      'raphaelewiley@aol.com',
      'ejlohcvznmiu1994@onet.pl',
      'llionelcohenbr@gmail.com',
      'verifynewssl@zoho.com',
      'Melissaamy5465@gmail.com',
      'irenem@userflowhq.com',
      'phhhillipwiligams@hotmail.com',
      'martin@glockapps.tech',
      'olegdublyaks@ukr.net',
      'marionrblack@outlook.com',
      'zygfrydgorski@interia.pl',
      'amandoteo79@virgilio.it',
      'georgewsack@gmail.com',
      'justinjacobsdj@hotmail.com',
      'candacechall@aol.com',
      'locirppokungiggk@gmx.de',
      'minniel.huggins@mail.ru',
      'marienavratilovas@seznam.cz',
      'amandoteo79@libero.it',
      'edwardmflannery@gmail.com',
      'wilberthawkesk@gmail.com',
      'sheilasmithse@hotmail.com',
      'edwardamato@mailo.com',
      'isabelllagorbunova@rambler.ru',
      'charlettevus@hotmail.com',
      'earleenwhudson@gmail.com',
      'aaron.colman@yandex.ru',
      'Michellemichelle6054@gmail.com',
      'michaelrwoodd@yahoo.com',
      'shannongreerf@outlook.com',
      'fredmrivenburg@aol.com',
      'wandammorrison@gmail.com',
      'jerrybrucedath@gmail.com',
      'thomasjamesj87@gmail.com',
      'joanyedonald@gmail.com',
      'verify79@web.de',
      'sgorska12@interia.pl',
      'josephsauerer@currently.com',
      'lashawnrheidrick@yahoo.com',
      'heavenpeck@freenet.de',
      'gd@desktopemail.com',
      'lenorebayerd@gmail.com',
      'verifyde79@gmx.de',
      'catherinedwilsonn@aol.com',
      'jeffsayerss@yahoo.com',
      'creissantdubois@laposte.net',
      'enappitamolh@gmx.de',
      'juliarspivey@aol.com',
      'jeremycworley@outlook.com',
      'lynettedweyand@protonmail.com',
      'verifycom79@gmx.com',
      'allanb@glockapps.awsapps.com',
      'sonjahoopsk@naver.com',
      'olegkozyyra@ukr.net',
      'jamiecrabson@outlook.com',
      'bbarretthenryhe@gmail.com',
      'lawrenceleddylr@gmail.com',
      'assa@auth.glockdb.com',
      'stewartzjones22@gmail.com',
      'genryjobson@outlook.com',
      'kathleeenstone@gmx.com',
      'cierawilliamsonwq@gmail.com',
      'andrgfeggins@mailo.com',
      'ivaansmcccln@att.net',
      'jimmyrushkerk@gmail.com',
      'larrycellis@aol.com',
      'leoefraser@yahoo.com',
      'glencabrera@outlook.fr',
      'hipolitjaworski@o2.pl',
      'johntberman@yahoo.com',
      'hacqmtldehsslm1997@onet.pl',
      'silviacopelandqy@gmail.com',
      'tristonreevestge@outlook.com.br',
      'mariettaandersons@sapo.pt',
      'taverasbrianvg@gmail.com',
      'bookerttubbs@zohomail.eu',
      'daishacorwingx@gmail.com',
      'verify79@buyemailsoftware.com',
      'alisonnlawrence@gmail.com',
      'sinkerfiil@outlook.com',
      'luanajortega@yahoo.com',
      'Dorothypp564@gmail.com',
      'virginia@buyemailsoftware.com',
      'wilcoxginax@gmail.com',
      'williamhbishopp@yahoo.com',
      'jurgeneberhartdd@web.de',
      'verifymailru79@mail.ru',
      'luttrellruthcase@gmail.com',
      'brittanyrocha@outlook.de',
      'mbell@fastdirectorysubmitter.com',
      'eliza@spamcombat.com',
      'katrina.rice@interia.pl',
      'williamhensley54@yahoo.com',
      'christinerachel6054@gmail.com',
    ];

    const mailOptions = {
      from: `Amaia Carrere - site web <${MYMAIL}>`,
      to: [...seedList, 'pietro.nolanda@gmail.com'],
      subject,
      text: `id: 2024-08-13-02:31:20:275t`,
      html: `
        id: 2024-08-13-02:31:20:275t
      `,
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
