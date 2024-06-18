import { FormEvent, useState } from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        className="flex flex-col gap-8 bg-surface-200 border-2 border-surface-300 p-12 shadow-xl rounded-md"
    >
        <p className="text-center leading-8 text-lg">
            Intéressé par un projet d'illustrations ?<br/>
            Contactez moi :
        </p>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col text-sm">
                <label htmlFor="name">Nom:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Text"
                    className="p-2 rounded-md"
                />
            </div>
            <div className="flex flex-col text-sm">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Text"
                    className="p-2 rounded-md"
                />
            </div>
            <div className="flex flex-col text-sm">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Hint text"
                    className="h-32 p-2 rounded-md"
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
