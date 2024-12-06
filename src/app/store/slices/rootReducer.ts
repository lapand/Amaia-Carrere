import { combineReducers } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  shop: articleReducer,
  cart: cartReducer,
});

export default rootReducer;
