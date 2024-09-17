import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMsgAction = createAsyncThunk(
  "sendMessage/sendMsgAction",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/createforummessage", data);

      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("userlist error", error);
      rejectWithValue(error);
    }
  }
);

const userSendMessage = createSlice({
  name: "sendMessage",
  initialState: {
    isLoading: false,
    errorMsg: null,
    userData: {},
    usersList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMsgAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(sendMsgAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.usersList = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(sendMsgAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default userSendMessage.reducer;
