import { createSlice } from "@reduxjs/toolkit";

const marketPulseSlice = createSlice({
  name: "marketPulse",
  initialState: {
    forexData: null,
  },
  reducers: {
    setForexData: (state, action) => {
      state.forexData = action.payload;
    },
    clearForexData: (state) => {
      state.forexData = null;
    },
  },
});


export const { setForexData, clearForexData } = marketPulseSlice.actions;
export const marketPulseReducer = marketPulseSlice.reducer;
export const selectForexData = (state) => state.marketPulse.forexData;
export default marketPulseSlice;
