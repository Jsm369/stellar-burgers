import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface NewOrderState {
  request: boolean;
  orderData: TOrder | null;
  error: string | null | undefined;
}

const initialState: NewOrderState = {
  request: false,
  orderData: null,
  error: null
};

export const newOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (data: []) => orderBurgerApi(data)
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrderThunk.fulfilled, (state, action) => {
        state.request = false;
        state.orderData = action.payload.order;
      })
      .addCase(newOrderThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(newOrderThunk.pending, (state) => {
        state.request = true;
      });
  }
});
