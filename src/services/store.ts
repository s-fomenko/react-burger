import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './reducers/burger-ingredients';
import constructorSlice from './reducers/burger-constructor';

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice
  }
});
