'use client';

import {
  concatObjectValues,
  encodeToHtmlEntities,
} from '@/utils/encodeToHtmlEntities';
import { useState } from 'react';
import { emailParts, addressParts, telParts } from '@/config/config';

export default function LegalNotice() {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isAdressVisible, setIsAdressVisible] = useState(false);
  const [isTelVisible, setIsTelVisible] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
        Mentions légales
      </h1>
      <p className="mb-6 text-sm sm:text-base lg:text-lg">
        Ces mentions légales sont fournies conformément aux obligations légales
        françaises (article 6 de la Loi pour la Confiance dans l&#39;Économie
        Numérique du 21 juin 2004).
      </p>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          Éditeur du site
        </h2>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Nom :</strong> Carrere Amaia
        </p>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Statut :</strong> Artiste-auteur
        </p>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Adresse : </strong>
          {!isAdressVisible ? (
            <button
              onClick={() => setIsAdressVisible(true)}
              className="p-1 border border-slate-900 max-2xl:text-sm"
              aria-label="Afficher l'adresse"
            >
              Dévoiler
            </button>
          ) : (
            concatObjectValues(addressParts)
          )}
        </p>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>SIRET :</strong> 921 692 869 000 16
        </p>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Responsable de la publication :</strong> Carrere Amaia
        </p>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Email : </strong>
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
          )}
        </p>
        <p className="text-sm sm:text-base lg:text-lg">
          <strong>Téléphone : </strong>
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
          )}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          Hébergeur du site
        </h2>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          <strong>Nom de l&#39;hébergeur :</strong> Hébergeur Fictif
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
          protégé par le droit d&#39;auteur. Toute reproduction, distribution,
          modification ou exploitation non autorisée est strictement interdite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          Limitation de responsabilité
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Les informations présentes sur ce site sont fournies à titre
          informatif. L&#39;éditeur ne saurait être tenu responsable des erreurs ou
          omissions. L&#39;utilisation de ce site se fait sous votre seule
          responsabilité.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          Contact
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          <span>
            Pour toute question relative à ces mentions légales, vous pouvez
            nous contacter à l&#39;adresse email suivante :{' '}
          </span>
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
          )}
        </p>
      </section>
    </div>
  );
}
