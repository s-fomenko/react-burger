import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BASE_API_URL} from "../../constants/api";
import {Data} from "../../models/data";

// export const getIngredients = createAsyncThunk(
//   'ingredients/getIngredients',
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
// );

type Modal = {
  currentItem: Data | null;
  orderIngredients: string[];
  modalType: string;
  isModalOpen: boolean;
};

const initialState: Modal = {
  currentItem: null,
  orderIngredients: [],
  modalType: '',
  isModalOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
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
    addCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
    removeCurrentItem: (state) => {
      state.currentItem = initialState.currentItem;
    },
    setModalType: (state, action ) => {
      state.modalType = action.payload;
    },
    resetModalType: (state) => {
      state.modalType = initialState.modalType;
    },
    toggleModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getIngredients.fulfilled, (state, action) => {
  //     state.items = action.payload;
  //   })
  // },
})

export const { addCurrentItem, removeCurrentItem, setModalType, resetModalType, toggleModalOpen } = modalSlice.actions

// selectors
export const selectModal = (state: { modal: Modal }) => state.modal;

export default modalSlice.reducer
