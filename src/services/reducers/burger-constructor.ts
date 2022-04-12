import {createSlice} from '@reduxjs/toolkit'
import {Data} from "../../models/data";

type Constructor = {
  burgerBun: Data | null;
  burgerFilling: Data[];
};

const initialState: Constructor = {
  burgerBun: null,
  burgerFilling: [],
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
  },
})

// export const { increment } = ingredientsSlice.actions

// selectors
export const selectConstructorItems = (state: { burgerConstructor: Constructor }) => state.burgerConstructor;

export default constructorSlice.reducer
