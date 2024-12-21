import { createSlice } from '@reduxjs/toolkit';

const marketPulseSlice = createSlice({
  name: 'marketPulse',
  initialState: {
    forexData: null,
    indiceData: null,
    commodityData: null,
    cryptoData: null,
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
    setCryptoData: (state, action) => {
      state.cryptoData = action.payload;
    },
    clearCryptoData: (state) => {
      state.cryptoData = null;
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
  setCryptoData, 
  clearCryptoData
} = marketPulseSlice.actions;
export const marketPulseReducer = marketPulseSlice.reducer;
export const selectForexData = (state) => state.marketPulse.forexData;
export const selectIndiceData = (state) => state.marketPulse.indiceData;
export const selectCommodityData = (state) => state.marketPulse.commodityData;
export default marketPulseSlice;
