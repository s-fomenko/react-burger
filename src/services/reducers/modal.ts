import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BASE_API_URL} from "../../constants/api";
import {Data} from "../../models/data";

export const setOrderNumber = createAsyncThunk(
  'modal/setOrderNumber',
  async (ingredients: string[]) => {
    const apiUrl = `${BASE_API_URL}orders`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ingredients": ingredients})
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      return response.order.number;
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }
);

type Modal = {
  currentItem: Data | null;
  modalType: string;
  isModalOpen: boolean;
  orderNumber: number | null;
};

const initialState: Modal = {
  currentItem: null,
  modalType: '',
  isModalOpen: false,
  orderNumber: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
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
    resetOrderNumber: (state) => {
      state.orderNumber = initialState.orderNumber;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOrderNumber.fulfilled, (state, action) => {
      state.orderNumber = action.payload;
      state.modalType = 'total';
      state.isModalOpen = true;
    })
    builder.addCase(setOrderNumber.rejected, state => {
      state.orderNumber = initialState.orderNumber;
      state.modalType = initialState.modalType;
      state.isModalOpen = initialState.isModalOpen;
    })
  },
})

export const {
  addCurrentItem,
  removeCurrentItem,
  setModalType,
  resetModalType,
  toggleModalOpen,
  resetOrderNumber
} = modalSlice.actions

// selectors
export const selectModal = (state: { modal: Modal }) => state.modal;

export default modalSlice.reducer
