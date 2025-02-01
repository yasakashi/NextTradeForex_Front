import { createSelector, createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course-reducer",
  initialState: {
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
    (state) => {
      return state?.course?.course_data;
    },
  ],
  (state) => state
);
