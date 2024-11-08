import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessageAction = createAsyncThunk(
  "sitemessage/sendMessageAction",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/communitygroup/addmessage",
        data
      );

      console.log("sitmsg", { response });
      return response.data;
    } catch (error) {
      console.log("siteMsg error", error);
      return rejectWithValue(error);
    }
  }
);

export const getMessages = createAsyncThunk(
  "sitemessage/getMessages",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/communitygroup/getmessage",
        data
      );

      console.log("sitmsg", { response });
      return response.data;
    } catch (error) {
      console.log("siteMsg error", error);
      return rejectWithValue(error);
    }
  }
);

export const removeMessage = createAsyncThunk(
  "sitemessage/removeMessage",
  async (
    { axiosPrivate, data, toast, setDeletedMsgId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post(
        "/api/sitemessage/deletemessage",
        data
      );
      if (response?.status === 200) {
        toast.success("Message removed.");
        setDeletedMsgId(null);
      }
      console.log("deleteMsg", { response });
      return response.data;
    } catch (error) {
      console.log("deleteMsg", error);
      return rejectWithValue(error);
    }
  }
);

export const getUserNotReadMessages = createAsyncThunk(
  "sitemessage/getUserNotReadMessages",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/sitemessage/getmessagenotvisitedcount",
        data
      );

      console.log("userNotReadMsg", { response });
      return response.data;
    } catch (error) {
      console.log("userNotReadMsg error", error);
      return rejectWithValue(error);
    }
  }
);

const userSendMessage = createSlice({
  name: "sitemessage",
  initialState: {
    sendMessageLoading: false,
    getMessageLoading: false,
    getUserNotReadMessagesLoading: false,
    userNotReadMessagesCount: "",
    siteMessages: [],
    sentMessage: {},
    errorMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAction.pending, (state) => {
        state.sendMessageLoading = true;
        state.errorMsg = null;
      })
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        console.log({ action });
        state.sendMessageLoading = false;
        state.sentMessage = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(sendMessageAction.rejected, (state, action) => {
        console.log({ action });
        state.sendMessageLoading = false;
        state.errorMsg = action.payload?.messageData;
      })

      // ----------------------------

      .addCase(getMessages.pending, (state) => {
        state.getMessageLoading = true;
        state.errorMsg = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        console.log({ action });
        state.getMessageLoading = false;
        state.siteMessages = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        console.log({ action });
        state.getMessageLoading = false;
        state.errorMsg = action.payload?.messageData;
      })

      // ----------------------------

      .addCase(removeMessage.pending, (state) => {
        state.getMessageLoading = true;
        state.errorMsg = null;
      })
      .addCase(removeMessage.fulfilled, (state, action) => {
        console.log({ action });
        state.getMessageLoading = false;
        state.sentMessage = action?.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(removeMessage.rejected, (state, action) => {
        console.log({ action });
        state.getMessageLoading = false;
        state.errorMsg = action.payload?.messageData;
      })

      // ----------------------------

      .addCase(getUserNotReadMessages.pending, (state) => {
        state.getUserNotReadMessagesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getUserNotReadMessages.fulfilled, (state, action) => {
        console.log({ action });
        state.getUserNotReadMessagesLoading = false;
        state.userNotReadMessagesCount =
          action?.payload?.messageData?.notreadmessagecount || "";
        state.errorMsg = null;
      })
      .addCase(getUserNotReadMessages.rejected, (state, action) => {
        console.log({ action });
        state.getUserNotReadMessagesLoading = false;
        state.errorMsg = action.payload?.messageData;
      });
  },
});

export default userSendMessage.reducer;
