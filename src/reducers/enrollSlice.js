import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // All enrollments
  currentEnrollment: null, // For single enrollment details
  loading: false,
  error: null,
  cancelledEnrollments: [], // Track cancelled enrollment IDs
};

const enrollSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    addEnrollment(state, action) {
      state.list.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateEnrollmentInList(state, action) {
      const index = state.list.findIndex(e => e._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    },
    setCurrentEnrollment(state, action) {
      state.currentEnrollment = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeEnrollment(state, action) {
      state.cancelledEnrollments.push(action.payload);
      state.list = state.list.filter(e => e._id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearEnrollments(state) {
      state.list = [];
      state.currentEnrollment = null;
      state.loading = false;
      state.error = null;
      state.cancelledEnrollments = [];
    },
  },
});

export const {
  setEnrollments,
  addEnrollment,
  updateEnrollmentInList,
  setCurrentEnrollment,
  removeEnrollment,
  setLoading,
  setError,
  clearEnrollments,
} = enrollSlice.actions;

export default enrollSlice.reducer;
