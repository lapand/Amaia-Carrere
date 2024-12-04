import { combineReducers } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';

const rootReducer = combineReducers({
  shop: articleReducer,
});

export default rootReducer;
