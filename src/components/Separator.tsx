import React from 'react';

type SeparatorType = {
  size?: 'sm' | 'md';
};

const Separator: React.FC<SeparatorType> = ({ size = 'md' }) => {
  let margin = 'm-4 sm:m-6';
  if (size === 'sm') margin = 'm-3 sm:m-4';

  return (
    <div className="bg-primary-600">
      <div className={`${margin} border-t border-primary-200`} />
    </div>
  );
};

export default Separator;
