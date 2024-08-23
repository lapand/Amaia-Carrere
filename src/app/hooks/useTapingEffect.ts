import { useEffect, useState } from 'react';

const useTapingEffect = (text: string, delay = 100) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timer = 0;
    const letters = text.split('');
    
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + letters.shift());
      timer += delay;
      if (letters.length === 0) {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return displayedText;
};

export default useTapingEffect;
