'use client';

export default function CancelPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-20">
      <h1 className="text-xl sm:text-2xl lg:text-xl">Paiement annulé</h1>
      <p className="text-lg sm:text-xl lg:text-lg text-center">
        Votre paiement n'a pas abouti,
        <br />
        vos articles sont conservés dans le panier.
      </p>
    </div>
  );
}
