import Button from './Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, TcontactSchema } from '../schemas/formSchema';
import { useTranslation, Trans } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const ContactForm: React.FC = () => {
  const { t } = useTranslation('common');

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

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
    if (responseData.emailSendingError) {
      const error = responseData.emailSendingError;
      console.error('Error: ' + error);
      alert('Error: The email could not be sent correctly.');
    }

    // response successfully
    if (responseData.success) {
      reset();
      console.log('The email has been sent successfully.');
      alert(
        "Email envoyé avec succès. Merci d'avoir pris le temps de m'écrire, je vous adresserai une réponse au plus vite."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 sm:gap-2"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col gap-1 text-sm">
          <motion.label
            htmlFor="email"
            className="px-2 py-1 rounded-md font-bold"
            animate={{
              background: !isFocused1
                ? 'linear-gradient(90deg, rgb(91 45 110 / 0) 60%, rgb(91 45 110 / 0.8))'
                : 'linear-gradient(90deg, rgb(91 45 110 / 1) 0%, rgb(91 45 110 / 0))',
              color: isFocused1 ? 'white' : '',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {t('contact.form.input1.label')}
          </motion.label>
          <motion.input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('contact.form.input1.placeholder')}
            className="p-2 rounded-md bg-transparent border-[1px] border-primary-600 outline-none placeholder:text-primary-600 placeholder:italic"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={
              errors.email ? `${errors.email.message}` : undefined
            }
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: '1.25rem' }}
                exit={{ height: 0 }}
                className="text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <motion.label
            htmlFor="subject"
            className="px-2 py-1 rounded-md font-bold"
            animate={{
              background: !isFocused2
                ? 'linear-gradient(90deg, rgb(91 45 110 / 0) 60%, rgb(91 45 110 / 0.8))'
                : 'linear-gradient(90deg, rgb(91 45 110 / 1) 0%, rgb(91 45 110 / 0))',
              color: isFocused2 ? 'white' : '',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {t('contact.form.input2.label')}
          </motion.label>
          <motion.input
            {...register('subject')}
            type="text"
            id="subject"
            placeholder={t('contact.form.input2.placeholder')}
            className="p-2 rounded-md bg-transparent border-[1px] border-primary-600 outline-none placeholder:text-primary-600 placeholder:italic"
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={
              errors.subject ? `${errors.subject.message}` : undefined
            }
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: '1.25rem' }}
                exit={{ height: 0 }}
                className="text-red-500"
              >
                {errors.subject.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <motion.label
            htmlFor="message"
            className="px-2 py-1 rounded-md font-bold"
            animate={{
              background: !isFocused3
                ? 'linear-gradient(90deg, rgb(91 45 110 / 0) 60%, rgb(91 45 110 / 0.8))'
                : 'linear-gradient(90deg, rgb(91 45 110 / 1) 0%, rgb(91 45 110 / 0))',
              color: isFocused3 ? 'white' : '',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {t('contact.form.input3.label')}
          </motion.label>
          <motion.textarea
            {...register('content')}
            id="message"
            placeholder={t('contact.form.input3.placeholder')}
            className="h-32 p-2 rounded-md bg-transparent border-[1px] border-primary-600 outline-none placeholder:text-primary-600 placeholder:italic"
            aria-invalid={errors.content ? 'true' : 'false'}
            aria-describedby={
              errors.content ? `${errors.content.message}` : undefined
            }
            onFocus={() => setIsFocused3(true)}
            onBlur={() => setIsFocused3(false)}
          />
          <AnimatePresence>
            {errors.content && (
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: '1.25rem' }}
                exit={{ height: 0 }}
                className="text-red-500"
              >
                {errors.content.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="self-center sm:self-end mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="sm:text-sm 3xl:text-base px-9 sm:px-6 py-3 disabled:bg-none disabled:bg-gray-500 font-bold"
        >
          {t('contact.form.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;