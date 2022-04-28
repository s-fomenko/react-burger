import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_API_URL } from '../../constants/api';
import { Data } from '../../models/data';
import { UserData } from '../../models/user';

// export const getPasswordResetCode = createAsyncThunk(
//   'user/getPasswordResetCode',
//   async () => {
//     const apiUrl = `${BASE_API_URL}ingredients`;
//     try {
//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error('Ответ сети был не ok.');
//       }
//       const response = await res.json();
//       return response.data;
//     } catch (e) {
//       console.log(`Error: ${e}`)
//     }
//   }
// )

// type Ingredients = {
//   items: Data[]
// };

const initialState: UserData = {
  user: {
    name: '',
    email: '',
  },
  accessToken: '',
  refreshToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // increaseCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ? {...item, count: item.count += 1} : item);
    // },
    // decreaseCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ? {...item, count: item.count -= 1} : item);
    // },
    // updateBunCount: (state, action) => {
    //   state.items.map(item => item._id === action.payload._id ?
    //     {...item, count: item.count === 0 ? item.count += 2 : item.count} :
    //     {...item, count: item.count === 2 ? item.count -= 2 : item.count});
    // },
    // resetCounts: state => {
    //   state.items.map(item => ({...item, count: item.count = 0}))
    // }
  },
  extraReducers: (builder) => {
    // builder.addCase(getIngredients.fulfilled, (state, action) => {
    //   action.payload.map((item: Data) => item.count = 0)
    //   state.items = action.payload;
    // })
    // builder.addCase(getIngredients.rejected, state => {
    //   state.items = initialState.items;
    // })
  },
})

// export const { increaseCount, decreaseCount, updateBunCount, resetCounts } = userSlice.actions

// selectors
export const selectUser = (state: { user: UserData }) => state.user;

export default userSlice.reducer
