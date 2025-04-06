import React, { useState } from 'react';
import LanguageSelector from './LanguageSelect';
import QuantitySelector from './QuantitySelector';
import AddToCart from './AddToCart';
import { LanguageOptionType, QuantityOptionType } from '@/types/selectOptions';
import { SingleValue } from 'react-select';
import { ArticleLanguageType } from '@/types';

type ProductSelectionType = {
  id: string;
  price: string;
  languages: ArticleLanguageType[];
};

const quantityOptions: QuantityOptionType[] = (() => {
  const arr = [];
  for (let i = 1; i < 31; i++) {
    arr.push({ value: i, label: i.toString() });
  }
  return arr;
})();

const ProductSelection: React.FC<ProductSelectionType> = ({
  id,
  price,
  languages,
}) => {
  const languageOptions = languages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  // Définir les états de la langue et de la quantité
  const [selectedLanguage, setSelectedLanguage] = useState<
    LanguageOptionType | undefined
  >(languages.length > 0 ? languageOptions[0] : undefined);

  const [selectedQuantity, setSelectedQuantity] = useState<QuantityOptionType>(
    quantityOptions[0]
  );

  // Gestion du changement de langue
  const handleLanguageChange = (language: SingleValue<LanguageOptionType>) => {
    language !== null && setSelectedLanguage(language);
  };

  // Gestion du changement de quantité
  const handleQuantityChange = (quantity: SingleValue<QuantityOptionType>) => {
    quantity !== null && setSelectedQuantity(quantity);
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      {selectedLanguage && (
        <LanguageSelector
          options={languageOptions}
          className="flex justify-between items-center"
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          label={'Sélection de la langue :'}
        />
      )}
      <QuantitySelector
        className="flex justify-between items-center gap-5"
        options={quantityOptions}
        selectedQuantity={selectedQuantity}
        onQuantityChange={handleQuantityChange}
      />
      <div className="flex justify-between items-center">
        <p className="text-lg xl:text-xl">
          {price}{' '}
          <span className="annie-use-your-telescope font-bold text-2xl">
            € <span className='text-xl'>TTC</span>
          </span>
        </p>
        <AddToCart
          id={id}
          language={selectedLanguage}
          quantity={selectedQuantity.value}
          size={'md'}
        />
      </div>
    </div>
  );
};

export default ProductSelection;
