import { createSlice } from '@reduxjs/toolkit';

const marketPulseSlice = createSlice({
  name: 'marketPulse',
  initialState: {
    forexData: null,
    indiceData: null,
  },
  reducers: {
    setForexData: (state, action) => {
      state.forexData = action.payload;
    },
    clearForexData: (state) => {
      state.forexData = null;
    },
    setIndiceData: (state, action) => {
      state.indiceData = action.payload;
    },
    clearIndiceData: (state) => {
      state.indiceData = null;
    },
  },
});

export const { setForexData, clearForexData, setIndiceData, clearIndiceData } =
  marketPulseSlice.actions;
export const marketPulseReducer = marketPulseSlice.reducer;
export const selectForexData = (state) => state.marketPulse.forexData;
export const selectIndiceData = (state) => state.marketPulse.indiceData;
export default marketPulseSlice;
