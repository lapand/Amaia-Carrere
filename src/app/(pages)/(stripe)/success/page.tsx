'use client';

import { clearCart } from '@/store/slices/cartSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-20">
      <h1 className="text-xl">Commande validée !</h1>
      <p className="text-lg">
        Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
      </p>
    </div>
  );
}
