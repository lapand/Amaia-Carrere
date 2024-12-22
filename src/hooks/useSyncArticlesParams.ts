'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStaticUpdatedAt, syncArticles } from '../../../store/slices/articleSlice';
import { RootState, AppDispatch } from '../../../store/configureStore';
import { ArticleCardType } from '@/types';

type UseSyncArticlesParams = {
  staticArticles: ArticleCardType[];
  fetchTimestamp: number | null;
};

const useSyncArticles = ({ staticArticles, fetchTimestamp }: UseSyncArticlesParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const shop = useSelector((state: RootState) => state.shop);

  useEffect(() => {
    if (fetchTimestamp) {
      const { staticUpdatedAt, dynamicUpdatedAt } = shop;
      const shouldSyncArticles =
        (!staticUpdatedAt && !dynamicUpdatedAt) ||
        (!dynamicUpdatedAt && fetchTimestamp > (staticUpdatedAt || 0)) ||
        (!staticUpdatedAt && fetchTimestamp > (dynamicUpdatedAt || 0)) ||
        (fetchTimestamp > (dynamicUpdatedAt || 0) &&
          fetchTimestamp > (staticUpdatedAt || 0));

      if (shouldSyncArticles) {
        dispatch(syncArticles(staticArticles));
        dispatch(setStaticUpdatedAt(fetchTimestamp));
      }
    }
  }, [dispatch, staticArticles, fetchTimestamp, shop]);
};

export default useSyncArticles;