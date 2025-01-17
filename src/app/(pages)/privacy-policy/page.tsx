'use client';

import { emailParts, telParts } from '@/data/contact';
import { concatObjectValues } from '@/utils/encodeToHtmlEntities';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isTelVisible, setIsTelVisible] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
        Politique de Confidentialité
      </h1>
      <p className="mb-6 text-sm sm:text-base lg:text-lg">
        Cette politique de confidentialité décrit comment Mme Carrere Amaia
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
          <li>
            Informations de contact : email (collecté via le formulaire de
            contact).
          </li>
          <li>Informations de navigation (adresse IP, type de navigateur).</li>
          <li>Données fournies volontairement via le formulaire de contact.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          2. Utilisation des données
        </h2>
        <p className="text-sm sm:text-base lg:text-lg mb-2">
          Les informations collectées sont utilisées pour :
        </p>
        <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
          <li>Fournir et améliorer nos services.</li>
          <li>Traiter vos commandes et demandes.</li>
          <li>
            Envoyer des communications marketing, si vous y avez consenti.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          3. Partage des données
        </h2>
        <p className="text-sm sm:text-base lg:text-lg mb-2">
          Nous ne partageons vos données personnelles qu&#39;avec :
        </p>
        <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
          <li>
            Nos prestataires de services (hébergement, traitement des paiements
            via Stripe).
          </li>
          <li>Les autorités légales, si requis par la loi.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          4. Stockage local
        </h2>
        <p className="text-sm sm:text-base lg:text-lg mb-2">
          Nous utilisons des technologies de stockage local (comme le
          localStorage) pour améliorer votre expérience sur notre site. Ces
          technologies nous permettent de :
        </p>
        <ul className="list-disc ml-6 text-sm sm:text-base lg:text-lg">
          <li>Mémoriser vos préférences et votre panier d&#39;achat.</li>
          <li>
            Conserver temporairement des données liées à votre session pour
            améliorer les performances du site.
          </li>
        </ul>
        <p className="text-sm sm:text-base lg:text-lg mt-2">
          Ces données sont stockées uniquement sur votre appareil et ne sont pas
          partagées avec des tiers, sauf dans le cadre des fonctionnalités du
          site nécessaires pour vous fournir le service attendu (par exemple,
          mémorisation du panier).
          <br />
          Vous pouvez supprimer ces données à tout moment en vidant le cache ou
          les données de navigation de votre navigateur. Cependant, cela
          pourrait limiter certaines fonctionnalités, telles que la mémorisation
          de votre panier ou de vos préférences.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          5. Sécurité des données
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Nous prenons des mesures raisonnables pour protéger vos informations
          personnelles contre tout accès, modification ou divulgation non
          autorisés. Toutefois, aucun système n&#39;est entièrement sécurisé, et
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
          {!isEmailVisible ? (
            <button
              onClick={() => setIsEmailVisible(true)}
              className="p-1 border border-slate-900 max-2xl:text-sm"
              aria-label="Afficher l'email"
            >
              Dévoiler
            </button>
          ) : (
            <a
              href={`mailto:${concatObjectValues(emailParts)}`}
              className="text-blue-600 hover:underline"
            >
              {concatObjectValues(emailParts)}
            </a>
          )}{' '}
          ou par téléphone au{' '}
          {!isTelVisible ? (
            <button
              onClick={() => setIsTelVisible(true)}
              className="p-1 border border-slate-900 max-2xl:text-sm"
              aria-label="Afficher le téléphone"
            >
              Dévoiler
            </button>
          ) : (
            concatObjectValues(telParts)
          )}{' '}
          .
        </p>
      </section>
    </div>
  );
}
