// src/Redux/ordersSlice/ordersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';


// Async thunk for fetching orders
export const fetchallOrders = createAsyncThunk('orders/fetchOrders', async (userId) => {
  const response = await api.get(`admin/orders/`);
  return response.data.data; // Assuming your API response has a `data` field
});

const AllordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchallOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchallOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchallOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AllordersSlice.reducer;
