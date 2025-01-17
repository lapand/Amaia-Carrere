import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { LanguageOptionType } from '@/types/selectOptions';

type LanguageSelectorType = {
  options: LanguageOptionType[];
  selectedLanguage: LanguageOptionType;
  onLanguageChange: (selectedOption: SingleValue<LanguageOptionType>) => void;
  label?: string;
  className?: string;
};

const LanguageSelector: React.FC<LanguageSelectorType> = ({
  options,
  selectedLanguage,
  onLanguageChange,
  label = 'Langue :',
  className = '',
}) => {
  const id = `language-select-${Date.now()}`;
  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        id={id}
        options={options}
        value={selectedLanguage}
        onChange={onLanguageChange}
      />
    </div>
  );
};

export default LanguageSelector;
