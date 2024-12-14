import { createSlice } from '@reduxjs/toolkit';

const marketPulseSlice = createSlice({
  name: 'marketPulse',
  initialState: {
    forexData: null,
    indiceData: null,
    commodityData: null,
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
    setCommodityData: (state, action) => {
      state.commodityData = action.payload;
    },
    clearCommodityData: (state) => {
      state.commodityData = null;
    },
  },
});

export const {
  setForexData,
  clearForexData,
  setIndiceData,
  clearIndiceData,
  setCommodityData,
  clearCommodityData,
} = marketPulseSlice.actions;
export const marketPulseReducer = marketPulseSlice.reducer;
export const selectForexData = (state) => state.marketPulse.forexData;
export const selectIndiceData = (state) => state.marketPulse.indiceData;
export const selectCommodityData = (state) => state.marketPulse.commodityData;
export default marketPulseSlice;
