import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const usersListAction = createAsyncThunk(
  "users/usersListAction",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/users/search", {
        username: "",
        fname: "",
        lname: "",
        mobile: "",
      });

      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("userlist error", error);
      rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    errorMsg: null,
    userData: {},
    usersList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersListAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(usersListAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.usersList = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(usersListAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default usersSlice.reducer;
