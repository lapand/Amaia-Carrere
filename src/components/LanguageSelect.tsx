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
      {label && (
        <label
          htmlFor={id}
          className="annie-use-your-telescope font-bold text-2xl underline underline-offset-4"
        >
          {label}
        </label>
      )}
      <Select
        id={id}
        options={options}
        value={selectedLanguage}
        onChange={onLanguageChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#e5d8ed',
            primary: '#754591',
          },
        })}
      />
    </div>
  );
};

export default LanguageSelector;
