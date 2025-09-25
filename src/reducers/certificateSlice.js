import { createSlice } from "@reduxjs/toolkit";

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    certificates: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCertificates: (state, action) => {
      state.certificates = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCertificates: (state) => {
      state.certificates = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCertificates, setLoading, setError, clearCertificates } =
  certificateSlice.actions;
export default certificateSlice.reducer;
