'use client';

import { emailParts, telParts } from '@/data/contact';
import { concatObjectValues } from '@/utils/encodeToHtmlEntities';
import { useState } from 'react';

export default function TermsAndConditions() {
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isTelVisible, setIsTelVisible] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
        Conditions Générales de Vente (CGV)
      </h1>
      <p className="mb-6 text-sm sm:text-base lg:text-lg">
        Les présentes conditions générales de vente (CGV) régissent les
        relations contractuelles entre Mme Carrere Amaia et ses clients, dans le
        cadre de la vente en ligne de ses produits.
      </p>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          1. Objet
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Les présentes CGV ont pour objet de définir les droits et obligations
          des parties dans le cadre de la vente en ligne des produits proposés
          par Mme Carrere Amaia.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          2. Commandes
        </h2>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          Toute commande passée sur notre site implique l&#39;acceptation des
          CGV. Les informations contractuelles seront confirmées par email après
          validation de la commande.
        </p>
        <p className="text-sm sm:text-base lg:text-lg">
          Nous nous réservons le droit d&#39;annuler ou de refuser une commande
          en cas de litige existant avec le client.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          3. Prix
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Les prix des produits sont indiqués en euros, toutes taxes comprises
          (TTC). Les frais de livraison sont ajoutés au prix total lors de la
          commande et dépendent des articles contenus dans le panier.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          4. Paiement
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Le paiement est sécurisé et peut être effectué par carte bancaire,
          PayPal, ou tout autre moyen proposé sur notre site. La commande sera
          expédiée après confirmation du paiement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          5. Livraison
        </h2>
        <p className="mb-2 text-sm sm:text-base lg:text-lg">
          Les délais de livraison varient selon la destination et le mode de
          transport choisi. Nous ne pouvons être tenus responsables des retards
          dus aux transporteurs.
        </p>
        <p className="text-sm sm:text-base lg:text-lg">
          En cas de problème à la réception (colis endommagé, produit manquant),
          le client doit nous contacter dans un délai de 48 heures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          6. Droit de rétractation
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Conformément à la législation en vigueur, le client dispose d’un délai
          de 14 jours pour exercer son droit de rétractation. Les produits
          doivent être retournés dans leur état d’origine, aux frais du client.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
          7. Service client
        </h2>
        <p className="text-sm sm:text-base lg:text-lg">
          Pour toute question ou réclamation, vous pouvez nous contacter par
          email à{' '}
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
