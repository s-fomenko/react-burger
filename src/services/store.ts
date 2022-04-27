import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './reducers/burger-ingredients';
import constructorSlice from './reducers/burger-constructor';
import modalSlice from './reducers/modal';
import userSlice from './reducers/user';

export const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsSlice,
    burgerConstructor: constructorSlice,
    modal: modalSlice,
    user: userSlice,
  }
});
