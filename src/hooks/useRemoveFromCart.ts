import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/slices/cartSlice';
import { ArticleLanguageType } from '@/types';

const useRemoveFromCart = () => {
  const dispatch = useDispatch();

  return (id: string, selectedLanguage?: ArticleLanguageType) => {
    if (!selectedLanguage) {
      dispatch(removeFromCart({ id }));
    } else {
      dispatch(removeFromCart({ id, language: selectedLanguage }));
    }
  };
};

export default useRemoveFromCart;
