import { clearCart } from '@/store/slices/cartSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col justify-center gap-20">
      <h1 className="text-xl">Commande réussie !</h1>
      <p className="">
        Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
      </p>
    </div>
  );
}
