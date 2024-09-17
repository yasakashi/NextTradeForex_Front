import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adminCreateNewCourse = createAsyncThunk(
  "adminCourse/adminCreateNewCourse",
  async (
    { axiosPrivate, data, toast, resetForm, navigate },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(
        "/api/course/addcourses",
        JSON.stringify(data)
      );
      if (response?.status === 200) {
        toast.success("Course Created successfully.");
        resetForm();
        let id = response?.data?.messageData?.id;
        navigate(`/admin/new-course/add-lessons/${id}`);
      }
      return response.data;
    } catch (error) {
      console.log("admincreatecourseError", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

const adminCourseSlice = createSlice({
  name: "adminCourse",
  initialState: {
    adminCreateCourseLoading: false,
    adminCourse: {},
    errorMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateNewCourse.pending, (state) => {
        state.adminCreateCourseLoading = true;
        state.errorMsg = null;
      })
      .addCase(adminCreateNewCourse.fulfilled, (state, action) => {
        console.log({ action });
        state.adminCreateCourseLoading = false;
        state.errorMsg = null;
        state.adminCourse = action.payload?.messageData;
      })
      .addCase(adminCreateNewCourse.rejected, (state, action) => {
        console.log({ action });
        state.adminCreateCourseLoading = false;
        state.errorMsg = action.payload;
      });
  },
});
export default adminCourseSlice.reducer;
