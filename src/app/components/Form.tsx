import { FormEvent, useState } from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Gérer l'envoi du formulaire ici (par exemple, envoyer les données à une API)
    console.log('Form data submitted:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[550px] flex flex-col gap-3 lg:gap-6 px-4 py-6 sm:p-8 lg:py-8 bg-primary-800 border-2 outline-double outline-primary-800 text-white shadow-xl rounded-md"
    >
      <p className="text-center leading-3 max-md:leading-7">
        <span className="block text-2xl xl:text-3xl font-bold">
          Intéressé par un projet d'illustrations ?
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
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@outlook.fr"
            className="p-2 rounded-md bg-primary-800 border-[1px] border-stone-500"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Text"
            className="p-2 rounded-md bg-primary-800 border-[1px] border-stone-500"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Leave a comment..."
            className="h-32 p-2 rounded-md bg-primary-800 border-[1px] border-stone-500"
          ></textarea>
        </div>
      </div>
      <div className="w-fit self-end text-sm">
        <Button type="submit">Envoyer</Button>
      </div>
    </form>
  );
};

export default ContactForm;
