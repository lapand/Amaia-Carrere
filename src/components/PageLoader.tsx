'use client';

import { useState, useEffect, PropsWithChildren } from 'react';
import Loader2 from './Loader2';
import TransitionDOM from './TransitionDOM';

const PageLoader: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      const handleComplete = () => setLoading(false);
      window.addEventListener('load', handleComplete);

      return () => {
        window.removeEventListener('load', handleComplete);
      };
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return loading ? (
    <Loader2 />
  ) : (
    <TransitionDOM visible={visible}>{children}</TransitionDOM>
  );
};

export default PageLoader;
