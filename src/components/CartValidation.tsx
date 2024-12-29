import React, { useState } from 'react';
import Button from './Button';
import { TcartSchema } from '../schemas/cartItemSchema';
import { useDispatch } from 'react-redux';
import {
  setDynamicUpdatedAt,
  setUnavailable,
  updateArticles,
} from '@/store/slices/articleSlice';
import { NewDataType } from '@/types/bddValidation';
import Link from 'next/link';
import Modal from '@/components/Modal';

type CartValidationType = {
  validationData: TcartSchema;
  shippingCost: number;
};

const CartValidation: React.FC<CartValidationType> = ({
  validationData,
  shippingCost,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [alertMsg, setAlertMsg] = useState<null | React.JSX.Element[] | string>(
    null
  );

  const mismatchHandler = (newData: NewDataType) => {
    // Indique à l'utilisateur des informations sur les changements des données des articles du panier.
    setAlertMsg(
      newData.alertMsg.map((msg, i: number) => {
        return (
          <React.Fragment key={i}>
            {msg}
            {i < newData.alertMsg.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        );
      })
    );

    // Stocke la date de la mise à jour des données en vue de la comparer avec la fraicheur des données statiques reçues par SSG ISR dans les composants ShopClient & ArticleClient et afficher ainsi les données les plus récentes.
    dispatch(setDynamicUpdatedAt(Date.now()));

    // Affiche les articles retirés de la bdd comme étant indisponibles le temps que de nouvelles props statiques retire l'article du site à la prochaine session utilisateur ouverte.
    newData.deletedArticles.forEach((article) => {
      dispatch(setUnavailable(article.id));
    });

    // Mise à jour des données des articles du panier.
    dispatch(updateArticles(newData.updatedArticles));
  };

  const handleCheckout = async (
    cartData: TcartSchema,
    shippingCost: number
  ) => {
    if (cartData.length === 0) {
      setAlertMsg('Panier vide !');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/validate-cart', {
        method: 'POST',
        body: JSON.stringify({ cartData, shippingCost }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.error) {
        if (data.error === 'discordance') {
          mismatchHandler(data.newData);
        } else {
          setAlertMsg([
            <>
              Une erreur est survenue lors de la validation du panier,
              <br />
              veuillez réessayer ou contacter l&#39;administrateur du site.
            </>,
          ]);
        }
      }

      if (res.ok && data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error: ,' + error);
      setAlertMsg([
        <>
          Une erreur est survenue, le serveur ne répond pas.
          <br />
          Veuillez réessayer ultérieurement ou contacter l&#39;administrateur du
          site.
        </>,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 xl:gap-5 max-lg:m-2">
      <div className="flex gap-3 max-sm:items-center items-start justify-center my-1">
        <input
          type="checkbox"
          id="cgv"
          name="cgv"
          required
          className="size-6 lg:size-4 flex-shrink-0 cursor-pointer hover:bg-slate-100 hover:shadow-inner sm:mt-1"
          onChange={(e) => {
            if (e.target.checked) {
              setIsDisabled(false);
              setShowError(false);
            } else {
              setIsDisabled(true);
            }
          }}
        />
        <label
          htmlFor="cgv"
          className="relative max-sm:text-sm sm:max-lg:text-lg"
        >
          J&#39;accepte les{' '}
          <Link
            href="/terms-and-conditions"
            target="_blank"
            className="underline underline-offset-2 text-blue-900"
          >
            Conditions Générales de Vente
          </Link>
          . <span className={`${showError ? 'text-red-600' : ''}`}>*</span>
        </label>
      </div>
      <div className="text-center">
        <Button
          onClick={() => {
            if (isDisabled) {
              setShowError(true);
            } else {
              handleCheckout(validationData, shippingCost);
            }
          }}
          className={`max-lg:w-11/12 text-lg sm:text-xl lg:text-base 3xl:text-lg rounded-[.3rem] px-8 sm:py-5 lg:py-3 ${
            isDisabled ? 'scale-100' : ''
          }`}
        >
          {loading ? 'En attente...' : 'Valider mon panier'}
        </Button>
      </div>
      <p className="lg:h-4 sm:text-lg lg:text-sm text-center text-red-600">
        {showError && 'Veuillez accepter les CGV pour continuer.'}
      </p>
      <Modal
        isOpen={alertMsg !== null}
        closeModal={() => setAlertMsg(null)}
        closeBtn={{ show: false }}
        className=" sm:max-lg:text-lg"
      >
        {alertMsg}
      </Modal>
    </div>
  );
};

export default CartValidation;
