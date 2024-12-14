import React, { useState } from 'react';
import Button from './Button';
import { TcartSchema } from '../schemas/cartItemSchema';
import { useDispatch } from 'react-redux';
import {
  removeArticle,
  setDynamicUpdatedAt,
  setUnavailable,
  syncArticles,
} from '@/store/slices/articleSlice';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { NewDataType } from '@/types/bddValidation';

type CartValidationType = {
  validationData: TcartSchema;
};

const CartValidation: React.FC<CartValidationType> = ({ validationData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(validationData);

  const mismatchHandler = (newData: NewDataType) => {
    alert(newData.alertMsg.map((msg) => msg + '\n').join(''));

    dispatch(setDynamicUpdatedAt(Date.now()));

    // Articles retirés
    newData.deletedArticles.forEach((article) => {
      dispatch(removeArticle(article.id));
      // Ajout d un champ isInBase & available dans cartSlice et isInBase false ici => "Article retiré de la vente" à la place du prix
    });

    // Articles mis à jour
    dispatch(syncArticles(newData.updatedArticles));
    newData.updatedArticles.forEach((article) => {
      if (!article.available) {
        // Reducer pour available false dans cartSlice => "Article indisponible" à la place du prix
      }
    });
  };

  const handleCheckout = async (cartData: TcartSchema) => {
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
    <div className="transition-transform duration-300 hover:scale-105 text-center">
      <Button
        onClick={() => handleCheckout(validationData)}
        className="text-base rounded-[.3rem] px-8 py-3"
      >
        {loading ? 'En attente...' : 'Valider mon panier'}
      </Button>
    </div>
  );
};

export default CartValidation;
