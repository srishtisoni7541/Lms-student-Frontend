import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPayments: (state) => {
      state.payments = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setPayments, addPayment, setLoading, setError, clearPayments } = paymentSlice.actions;

export default paymentSlice.reducer;
