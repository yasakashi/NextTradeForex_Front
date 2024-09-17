import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface props {
  course_data: any;
}

export const courseSlice = createSlice({
  name: "course-reducer",
  initialState: <props>{
    course_data: {},
  },
  reducers: {
    set_course_data_state: (state, action) => {
      state.course_data = action.payload;
    },
  },
});

export const courseReducer = courseSlice.reducer;
export const { set_course_data_state } = courseSlice.actions;

export const course_data_selector = createSelector(
  [
    (state: any) => {
      return state?.course?.course_data;
    },
  ],
  (state) => state
);
