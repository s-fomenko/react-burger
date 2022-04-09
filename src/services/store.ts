import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './reducers/burger-ingredients';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
  }
});
