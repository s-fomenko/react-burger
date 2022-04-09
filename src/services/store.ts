import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './reducers/burger-ingredients';
import constructorSlice from './reducers/burger-constructor';
import currentItemSlice from './reducers/curentItem';
import orderSlice from './reducers/order';

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice,
    currentItem: currentItemSlice,
    order: orderSlice,
  }
});
