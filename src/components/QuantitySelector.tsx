import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { QuantityOptionType } from '@/types/selectOptions';

type QuantitySelectorType = {
  options: QuantityOptionType[];
  selectedQuantity: QuantityOptionType | null;
  onQuantityChange: (selectedOption: SingleValue<QuantityOptionType>) => void;
  label?: string;
  className?: string;
};

const QuantitySelector: React.FC<QuantitySelectorType> = ({
  options,
  selectedQuantity,
  onQuantityChange,
  label = 'Quantité :',
  className = '',
}) => {
  const id = `quantity-select-${Date.now()}`;
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        id={id}
        options={options}
        value={selectedQuantity}
        onChange={onQuantityChange}
        maxMenuHeight={150}
        menuPlacement="auto"
      />
    </div>
  );
};

export default QuantitySelector;
