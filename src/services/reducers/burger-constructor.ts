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
    addBun: (state, action ) => {
      state.burgerBun = action.payload;
    },
    addFilling: (state, action ) => {
      state.burgerFilling.push(action.payload);
    },
    removeFilling: (state, action) => {
      state.burgerFilling = state.burgerFilling.filter(item => item.uuid !== action.payload.uuid);
    }
  },
})

export const { addBun, addFilling, removeFilling } = constructorSlice.actions

// selectors
export const selectConstructorItems = (state: { burgerConstructor: Constructor }) => state.burgerConstructor;

export default constructorSlice.reducer
