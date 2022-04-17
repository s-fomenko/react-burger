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
  name: 'burgerIngredients',
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      state.items.map(item => item._id === action.payload._id ? {...item, count: item.count += 1} : item);
    },
    decreaseCount: (state, action) => {
      state.items.map(item => item._id === action.payload._id ? {...item, count: item.count -= 1} : item);
    },
    updateBunCount: (state, action) => {
      state.items.map(item => item._id === action.payload._id ?
        {...item, count: item.count === 0 ? item.count += 2 : item.count} :
        {...item, count: item.count === 2 ? item.count -= 2 : item.count});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      action.payload.map((item: Data) => item.count = 0)
      state.items = action.payload;
    })
    builder.addCase(getIngredients.rejected, state => {
      state.items = initialState.items;
    })
  },
})

export const { increaseCount, decreaseCount, updateBunCount } = ingredientsSlice.actions

// selectors
export const selectIngredients = (state: { burgerIngredients: Ingredients }) => state.burgerIngredients.items;

export default ingredientsSlice.reducer
