import Button from './Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, TcontactSchema } from '../schemas/formSchema';
import { useTranslation, Trans } from 'react-i18next';

const ContactForm: React.FC = () => {
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TcontactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: TcontactSchema) => {
    const response = await fetch('/api/sendmail', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    // Absence de réponse du serveur
    if (!response.ok) {
      alert('Submitting form failed, the server is not responding');
      return;
    }

    // Récupération des erreurs de validation des données côté serveur
    if (responseData.zodErrors) {
      const errors = responseData.zodErrors;
      Object.keys(data).forEach((field) => {
        if (errors[field]) {
          setError(field as keyof TcontactSchema, {
            type: 'server',
            message: errors[field],
          });
        }
      });
      if (Object.keys(data).every((field) => !errors[field])) {
        alert('Something went wrong!');
      }
    }

    // Récupération des erreurs d'envoi d'email
    if( responseData.emailSendingError){
      const error = responseData.emailSendingError;
      console.log("Error: " + error);
      alert("Error: The email could not be sent correctly.");
    }

    // response successfully
    if (responseData.success) {
      reset();
      console.log("The email has been sent successfully.");
      alert("Email envoyé avec succès. Merci d'avoir pris le temps de m'écrire, je vous adresserai une réponse au plus vite.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 lg:gap-6 px-4 py-6 sm:p-8 lg:py-8 bg-gradient-to-tr from-primary-800/90 to-primary-800 border-2 outline-double outline-primary-800 text-white shadow-xl rounded-md"
    >
      <p className="text-center leading-3 max-md:leading-7">
        <span className="block text-2xl 2xl:text-3xl font-bold">
          <Trans i18nKey="common:contact.form.formTitle" components={{ strong: <strong /> }} />
        </span>
        <br />
        <span className="text-base xl:text-lg text-stone-300">
          {t('contact.form.formSubTitle')}
        </span>
      </p>
      <div className="flex flex-col gap-2 xl:gap-4">
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="email">{t('contact.form.input1.label')}</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('contact.form.input1.placeholder')}
            className="p-2 rounded-md bg-transparent border-[1px] border-stone-500"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={
              errors.email ? `${errors.email.message}` : undefined
            }
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="subject">{t('contact.form.input2.label')}</label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            placeholder={t('contact.form.input2.placeholder')}
            className="p-2 rounded-md bg-transparent border-[1px] border-stone-500"
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={
              errors.subject ? `${errors.subject.message}` : undefined
            }
          />
          {errors.subject && (
            <p className="text-red-500">{`${errors.subject.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="message">{t('contact.form.input3.label')}</label>
          <textarea
            {...register('content')}
            id="message"
            placeholder={t('contact.form.input3.placeholder')}
            className="h-32 p-2 rounded-md bg-transparent border-[1px] border-stone-500"
            aria-invalid={errors.content ? 'true' : 'false'}
            aria-describedby={
              errors.content ? `${errors.content.message}` : undefined
            }
          ></textarea>
          {errors.content && (
            <p className="text-red-500">{`${errors.content.message}`}</p>
          )}
        </div>
      </div>
      <div className="w-fit self-end text-sm">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="disabled:bg-none disabled:bg-gray-500"
        >
          {t('contact.form.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
