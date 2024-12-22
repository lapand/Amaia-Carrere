import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux DevTools peut consommer beaucoup de ressources, car il enregistre chaque action dispatchée et l'état du store à chaque changement. On le désactive donc uniquement en prod pour éviter un ralentissement de l'application et une consommation inutile de la mémoire.