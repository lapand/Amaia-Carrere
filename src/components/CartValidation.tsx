import React from 'react';
import Button from './Button';
import { TcartSchema } from '../schemas/cartItemSchema';

type CartValidationType = {
  validationData: TcartSchema;
};

const CartValidation: React.FC<CartValidationType> = ({ validationData }) => {
  const handleCheckout = async (cartData: TcartSchema) => {
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
        alert(data.errorMessage);
      } else {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error('Error: ,' + error);
      alert('Une erreur est survenue, le serveur ne répond pas');
    }
  };

  return (
    <div className="transition-transform duration-300 hover:scale-105 text-center">
      <Button
        onClick={() => handleCheckout(validationData)}
        className="text-base rounded-[.3rem] px-8 py-3"
      >
        Valider mon panier
      </Button>
    </div>
  );
};

export default CartValidation;