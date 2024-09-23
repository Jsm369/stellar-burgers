import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

export const ordersInitialState: OrdersState = {
  orders: [],
  isLoading: true
};

export const getOrdersThunk = createAsyncThunk('orders/ofUsers', async () =>
  getOrdersApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
