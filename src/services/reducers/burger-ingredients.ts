import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BASE_API_URL} from "../../constants/api";
import {Data} from "../../models/data";

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const apiUrl = `${BASE_API_URL}ingredients`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response.data;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
)

type Ingredients = {
  items: Data[]
};

const initialState: Ingredients = {
  items: [],
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
    })
  },
})

// export const { increment } = ingredientsSlice.actions

// selectors
export const selectItems = (state: { ingredients: Ingredients }) => state.ingredients.items

export default ingredientsSlice.reducer
