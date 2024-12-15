export default function LegalNotice() {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          Mentions légales
        </h1>
        <p className="mb-6 text-sm sm:text-base lg:text-lg">
          Ces mentions légales sont fournies conformément aux obligations légales
          françaises (article 6 de la Loi pour la Confiance dans l'Économie
          Numérique du 21 juin 2004).
        </p>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Éditeur du site
          </h2>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Nom de l'entreprise :</strong> Nom Fictif SARL
          </p>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Adresse :</strong> 123, Rue Imaginaire, 75000 Paris, France
          </p>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>SIRET :</strong> 123 456 789 00012
          </p>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Responsable de la publication :</strong> Jean Dupont
          </p>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Email :</strong>{" "}
            <a href="mailto:contact@nomfictif.com" className="text-blue-600 hover:underline">
              contact@nomfictif.com
            </a>
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            <strong>Téléphone :</strong> +33 1 23 45 67 89
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Hébergeur du site
          </h2>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Nom de l'hébergeur :</strong> Hébergeur Fictif
          </p>
          <p className="mb-2 text-sm sm:text-base lg:text-lg">
            <strong>Adresse :</strong> 456, Avenue Virtuelle, 69000 Lyon, France
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            <strong>Téléphone :</strong> +33 4 56 78 90 12
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Propriété intellectuelle
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Le contenu de ce site (textes, images, logos, vidéos, etc.) est
            protégé par le droit d'auteur. Toute reproduction, distribution,
            modification ou exploitation non autorisée est strictement
            interdite.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Limitation de responsabilité
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Les informations présentes sur ce site sont fournies à titre
            informatif. L'éditeur ne saurait être tenu responsable des erreurs ou
            omissions. L'utilisation de ce site se fait sous votre seule
            responsabilité.
          </p>
        </section>
  
        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Contact
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Pour toute question relative à ces mentions légales, vous pouvez
            nous contacter à l'adresse email suivante :{" "}
            <a href="mailto:contact@nomfictif.com" className="text-blue-600 hover:underline">
              contact@nomfictif.com
            </a>
          </p>
        </section>
      </div>
    );
  }
  