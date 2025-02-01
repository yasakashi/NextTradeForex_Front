import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const generalSlice = createSlice({
  name: "general-reducer",
  initialState: {
    loading: false,
    loading_level_2: false,
    auth: false,
    message: { color: "", message: "", mode: false },
  },
  reducers: {
    show_message: (state, action) => {
      state.message = {
        mode: action.payload.mode,
        color: action.payload.color,
        message: action.payload.message || "",
      };
    },
    reload_auth: (state, action) => {
      state.auth = !state.auth;
    },
    toggle_loading: (state, action) => {
      state.loading = action.payload;
    },
    toggle_loading_level_2: (state, action) => {
      state.loading_level_2 = action.payload;
    },
  },
});

export const generalReducer = generalSlice.reducer;
export const {
  toggle_loading,
  toggle_loading_level_2,
  show_message,
  reload_auth,
} = generalSlice.actions;

export const loading_selector = createSelector(
  [
    (state) => {
      return state?.general?.loading;
    },
  ],
  (state) => state
);
export const loading_level_2_selector = createSelector(
  [
    (state) => {
      return state?.general?.loading_level_2;
    },
  ],
  (state) => state
);
export const useAppSelector = useSelector;
