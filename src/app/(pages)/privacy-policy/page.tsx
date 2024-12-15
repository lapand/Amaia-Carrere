export default function PrivacyPolicy() {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          Politique de Confidentialité
        </h1>
        <p className="mb-6 text-sm sm:text-base lg:text-lg">
          Cette politique de confidentialité décrit comment **Nom Fictif SARL**
          collecte, utilise et protège vos informations personnelles lorsque vous
          utilisez notre site internet.
        </p>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            1. Données collectées
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-2">
            Lorsque vous visitez notre site, nous collectons les données suivantes
            :
          </p>
          <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
            <li>Informations de contact (nom, email, téléphone).</li>
            <li>Informations de navigation (adresse IP, type de navigateur).</li>
            <li>Données fournies volontairement via les formulaires.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            2. Utilisation des données
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Les informations collectées sont utilisées pour :
          </p>
          <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
            <li>Fournir et améliorer nos services.</li>
            <li>Traiter vos commandes et demandes.</li>
            <li>Envoyer des communications marketing, si vous y avez consenti.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            3. Partage des données
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-2">
            Nous ne partageons vos données personnelles qu'avec :
          </p>
          <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
            <li>Nos prestataires de services (hébergement, paiement).</li>
            <li>Les autorités légales, si requis par la loi.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            4. Cookies
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Nous utilisons des cookies pour améliorer votre expérience utilisateur
            et analyser le trafic sur notre site. Vous pouvez configurer votre
            navigateur pour refuser les cookies, mais cela pourrait limiter
            certaines fonctionnalités.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            5. Sécurité des données
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Nous prenons des mesures raisonnables pour protéger vos informations
            personnelles contre tout accès, modification ou divulgation non
            autorisés. Toutefois, aucun système n'est entièrement sécurisé, et
            nous ne pouvons garantir la sécurité absolue des données.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            6. Vos droits
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-2">
            Conformément à la législation en vigueur, vous disposez des droits
            suivants :
          </p>
          <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
            <li>Accéder à vos données personnelles.</li>
            <li>Demander la correction ou la suppression de vos données.</li>
            <li>Retirer votre consentement à tout moment.</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            7. Contact
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Pour toute question concernant cette politique de confidentialité ou
            pour exercer vos droits, vous pouvez nous contacter à :
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            <a
              href="mailto:privacy@nomfictif.com"
              className="text-blue-600 hover:underline"
            >
              privacy@nomfictif.com
            </a>{" "}
            ou par téléphone au +33 1 23 45 67 89.
          </p>
        </section>
      </div>
    );
  }
  