import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createSignalChannleAction = createAsyncThunk(
  "signalChannel/createSignalChannleAction",
  async ({ axiosPrivate, data, toast, navigate, id }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/signal/addsignalchannel",
        data
      );

      console.log({ response });
      console.log(id);
      if (response?.status === 200) {
        toast.success("Signal channel is created successfully");
        navigate(
          `/traders-community/groups/${localStorage.getItem(
            "groupname"
          )}/signal-channels`
        );
      }

      return response.data;
    } catch (error) {
      console.log("create signal channel error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

export const getGroupSignalChannels = createAsyncThunk(
  "signalChannel/getGroupSignalChannels",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axiosPrivate.post(
        "/api/signal/getsignalchannel",
        data
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("getsignalchannels error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

export const getSignalChannel = createAsyncThunk(
  "signalChannel/getSignalChannel",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {

    try {
      const response = await axiosPrivate.post(
        "/api/signal/getsignalchannel",
        data
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("getsignalchannels error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

export const removeSignalChannel = createAsyncThunk(
  "signalChannel/removeSignalChannel",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/signal/deletesignalchannel",
        data
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("removesignalChannel error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

export const updateSignalChannel = createAsyncThunk(
  "signalChannel/updateSignalChannel",
  async ({ axiosPrivate, data, toast, navigate, id }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/signal/updatesignalchannel",
        data
      );

      console.log({ response });
      console.log(id);
      if (response?.status === 200) {
        toast.success("Signal channel updated.");
        navigate(
          `/traders-community/groups/${localStorage.getItem(
            "groupname"
          )}/signal-channels`
        );
      }

      return response.data;
    } catch (error) {
      console.log("updateSignalChannel error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

const signalChannelsSlice = createSlice({
  name: "signalChannel",
  initialState: {
    isLoading: false,
    errorMsg: null,
    signalChannels: [],
    signalChannel: {},
    signalChanneslLoading: false,
    removeSignalChannelLoading: false,
    getSignalChannelLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createSignalChannleAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(createSignalChannleAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = null;
        state.allGroups = action.payload;
      })
      .addCase(createSignalChannleAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })

      // ****************************
      .addCase(getGroupSignalChannels.pending, (state) => {
        state.signalChanneslLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupSignalChannels.fulfilled, (state, action) => {
        console.log({ action });
        state.signalChanneslLoading = false;
        state.errorMsg = null;
        state.signalChannels = action.payload?.messageData;
      })
      .addCase(getGroupSignalChannels.rejected, (state, action) => {
        console.log({ action });
        state.signalChanneslLoading = false;
        state.errorMsg = action.payload;
      })
      // ****************************
      .addCase(removeSignalChannel.pending, (state) => {
        state.removeSignalChannelLoading = true;
        state.errorMsg = null;
      })
      .addCase(removeSignalChannel.fulfilled, (state, action) => {
        console.log({ action });
        state.removeSignalChannelLoading = false;
        state.errorMsg = null;
        state.signalChannels = action.payload?.messageData;
      })
      .addCase(removeSignalChannel.rejected, (state, action) => {
        console.log({ action });
        state.removeSignalChannelLoading = false;
        state.errorMsg = action.payload;
      })
      // ****************************
      .addCase(getSignalChannel.pending, (state) => {
        state.getSignalChannelLoading = true;
        state.errorMsg = null;
      })
      .addCase(getSignalChannel.fulfilled, (state, action) => {
        console.log({ action });
        state.getSignalChannelLoading = false;
        state.errorMsg = null;
        state.signalChannel = action.payload?.messageData[0];
      })
      .addCase(getSignalChannel.rejected, (state, action) => {
        console.log({ action });
        state.getSignalChannelLoading = false;
        state.errorMsg = action.payload;
      })
      // ****************************
      .addCase(updateSignalChannel.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(updateSignalChannel.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = null;
        state.signalChannel = action.payload?.messageData[0];
      })
      .addCase(updateSignalChannel.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default signalChannelsSlice.reducer;
