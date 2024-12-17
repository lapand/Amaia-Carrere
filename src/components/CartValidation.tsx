import React, { useState } from 'react';
import Button from './Button';
import { TcartSchema } from '../schemas/cartItemSchema';
import { useDispatch } from 'react-redux';
import {
  setDynamicUpdatedAt,
  setUnavailable,
  syncArticles,
} from '@/store/slices/articleSlice';
import { NewDataType } from '@/types/bddValidation';

type CartValidationType = {
  validationData: TcartSchema;
};

const CartValidation: React.FC<CartValidationType> = ({ validationData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(validationData);

  const mismatchHandler = (newData: NewDataType) => {
    // Indique à l'utilisateur des informations sur les changements des données des articles du panier.
    alert(newData.alertMsg.map((msg) => msg + '\n').join(''));

    // Stocke la date de la mise à jour des données en vue de la comparer avec la fraicheur des données statiques reçues par SSG ISR dans les composants ShopClient & ArticleClient et afficher ainsi les données les plus récentes.
    dispatch(setDynamicUpdatedAt(Date.now()));

    // Affiche les articles retirés de la bdd comme étant indisponibles le temps que de nouvelles props statiques retire l'article du site à la prochaine session utilisateur ouverte.
    newData.deletedArticles.forEach((article) => {
      dispatch(setUnavailable(article.id));
    });

    // Mise à jour des données des articles du panier.
    dispatch(syncArticles(newData.updatedArticles));
  };

  const handleCheckout = async (cartData: TcartSchema) => {
    if (cartData.length === 0) {
      alert('Panier vide !');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/validate-cart', {
        method: 'POST',
        body: JSON.stringify(cartData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.error) {
        if (data.error === 'discordance') {
          console.log(6, data.error, data.newData);
          mismatchHandler(data.newData);
        } else {
          console.log(6, data.error);
          alert(data.error);
        }
      }

      if (res.ok && data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error: ,' + error);
      alert('Une erreur est survenue, le serveur ne répond pas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <Button
        onClick={() => handleCheckout(validationData)}
        className="max-lg:w-11/12 text-lg sm:text-xl lg:text-base 3xl:text-lg max-lg:m-2 rounded-[.3rem] px-8 sm:py-5 lg:py-3"
      >
        {loading ? 'En attente...' : 'Valider mon panier'}
      </Button>
    </div>
  );
};

export default CartValidation;
