import Button from './Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, TcontactSchema } from '../schemas/formSchema';

const ContactForm: React.FC = () => {
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

    if (!response.ok) {
      alert('Submitting form failed!');
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
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

    if (responseData.success) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 lg:gap-6 px-4 py-6 sm:p-8 lg:py-8 bg-gradient-to-tr from-primary-800/90 to-primary-800 border-2 outline-double outline-primary-800 text-white shadow-xl rounded-md"
    >
      <p className="text-center leading-3 max-md:leading-7">
        <span className="block text-2xl 2xl:text-3xl font-bold">
          Intéressé(e) par un projet d'illustrations ?
        </span>
        <br />
        <span className="text-base xl:text-lg text-stone-300">
          Contactez moi par email ou téléphone
        </span>
      </p>
      <div className="flex flex-col gap-2 xl:gap-4">
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="email">Email:</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="name@outlook.fr"
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
          <label htmlFor="subject">Subject:</label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            placeholder="Text"
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
          <label htmlFor="message">Message:</label>
          <textarea
            {...register('content')}
            id="message"
            placeholder="Leave a comment..."
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
          Envoyer
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
