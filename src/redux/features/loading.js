import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
});


export const { startLoading, stopLoading, resetLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
