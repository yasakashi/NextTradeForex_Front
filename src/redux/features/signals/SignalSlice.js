import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addSignalAction = createAsyncThunk(
  "signal/addSignalAction",
  async ({ axiosPrivate, data, toast, navigate, id }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/signal/addsignal", data);

      console.log({ response });
      // if (response?.status === 200) {
      //   toast.success("Signal is created successfully");
      //   // navigate(`/traders-community/groups/${id}`);
      // }

      return response.data;
    } catch (error) {
      console.log("create signal channel error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const removeSignalAction = createAsyncThunk(
  "signal/removeSignalAction",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/signal/deletesignal",
        data
      );

      console.log("remove signal", { response });
      if (response?.status === 200) {
        toast.success("Signal removed");
      }

      return response.data;
    } catch (error) {
      console.log("remove signal error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getSignals = createAsyncThunk(
  "signal/getSignals",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = await axiosPrivate.post(
        "/api/signal/getsignal",
        JSON.stringify(data)
      );

      console.log("signals", { response });

      return response.data;
    } catch (error) {
      console.log("getsignals error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getAnalysisType = createAsyncThunk(
  "signal/getAnalysisType",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getanalysistype");

      console.log("analysis type", { response });

      return response.data;
    } catch (error) {
      console.log("getAnalysisType error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getPositionType = createAsyncThunk(
  "signal/getPositionType",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getpositiontype");

      console.log("position type", { response });

      return response.data;
    } catch (error) {
      console.log("getPositionType error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getMarketCycle = createAsyncThunk(
  "signal/getMarketCycle",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getmarketcycle");

      console.log("market cycle", { response });

      return response.data;
    } catch (error) {
      console.log("getMrketCycle error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getInstrument = createAsyncThunk(
  "signal/getInstrument",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getinstrument");

      console.log("instruments", { response });

      return response.data;
    } catch (error) {
      console.log("getinstrument error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getEntryPoint = createAsyncThunk(
  "signal/getEntryPoint",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getentrypoint");

      console.log("entry point", { response });

      return response.data;
    } catch (error) {
      console.log("getentrypoint error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const postSignalImage = createAsyncThunk(
  "signal/postSignalImage",
  async ({ axiosPrivate, IFormFile, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/signal/uploadsignalimage",
        IFormFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("upload signal file", { response });

      return response.data;
    } catch (error) {
      console.log("postsignalImgae error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getSignalImage = createAsyncThunk(
  "signal/getSignalImage",
  async ({ axiosPrivate, id, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/api/signal/getimageurl/${id}`);
      console.log("getsignal img", response);
      return response.data;
    } catch (error) {
      console.log("getSignalImage error", error);

      return rejectWithValue(error);
    }
  }
);

const signalSlice = createSlice({
  name: "signal",
  initialState: {
    isLoading: false,
    removeSignalLoading: false,
    signalsLoading: false,
    signalImgLoading: false,
    errorMsg: null,
    signalChannels: [],
    analysisTypes: [],
    positionTypes: [],
    marketCycles: [],
    instruments: [],
    entryPoints: [],
    signalChannelId: localStorage.getItem("signalChannelId") || "",

    signals: [],
    signal: {},
    signalChannelOwnerId: localStorage.getItem("signalChannelOwnerId") || "",
  },
  reducers: {
    setSignalChannelId: (state, action) => {
      console.log({ action });
      state.groupId = action.payload;
      localStorage.setItem("signalChannelId", action.payload); // Save to localStorage
    },
    clearSignalChannelId: (state) => {
      state.groupId = "";
      localStorage.removeItem("signalChannelId"); // Remove from localStorage
    },

    setSignalOwnerID: (state, action) => {
      localStorage.setItem("signalChannelOwnerId", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addSignalAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(addSignalAction.fulfilled, (state, action) => {
        // console.log({ action });
        state.isLoading = false;
        state.errorMsg = null;
      })
      .addCase(addSignalAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(getAnalysisType.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getAnalysisType.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log({ action });
        state.analysisTypes = action.payload?.messageData;
      })
      .addCase(getAnalysisType.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      // ****************************************************

      .addCase(getPositionType.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getPositionType.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log({ action });
        state.positionTypes = action.payload?.messageData;
      })
      .addCase(getPositionType.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      // **************************************************************
      .addCase(getMarketCycle.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getMarketCycle.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log({ action });
        state.marketCycles = action.payload?.messageData;
      })
      .addCase(getMarketCycle.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      // **************************************************************
      .addCase(getInstrument.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getInstrument.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log({ action });
        state.instruments = action.payload?.messageData;
      })
      .addCase(getInstrument.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      // **************************************************************
      .addCase(getEntryPoint.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getEntryPoint.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log({ action });
        state.entryPoints = action.payload?.messageData;
      })
      .addCase(getEntryPoint.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })

      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6666
      .addCase(getSignals.pending, (state, action) => {
        state.signalsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getSignals.fulfilled, (state, action) => {
        state.signalsLoading = false;
        console.log({ action });
        state.signals = action.payload?.messageData;
      })
      .addCase(getSignals.rejected, (state, action) => {
        state.signalsLoading = false;
        console.log({ action });
      })
      // _______post signal image
      .addCase(postSignalImage.pending, (state, action) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(postSignalImage.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      .addCase(postSignalImage.rejected, (state, action) => {
        state.isLoading = false;
        console.log({ action });
      })
      // _______post signal image
      .addCase(removeSignalAction.pending, (state, action) => {
        state.removeSignalLoading = true;
        state.errorMsg = null;
      })
      .addCase(removeSignalAction.fulfilled, (state, action) => {
        state.removeSignalLoading = false;
        state.signal = action?.payload?.messageData;
        console.log({ action });
      })
      .addCase(removeSignalAction.rejected, (state, action) => {
        state.removeSignalLoading = false;
        console.log({ action });
      })
      // ---------------get signal image
      .addCase(getSignalImage.pending, (state, action) => {
        state.signalImgLoading = true;
        state.errorMsg = null;
      })
      .addCase(getSignalImage.fulfilled, (state, action) => {
        state.signalImgLoading = false;
        state.signal = action?.payload?.messageData;
        console.log({ action });
      })
      .addCase(getSignalImage.rejected, (state, action) => {
        state.signalImgLoading = false;
        console.log({ action });
      });
  },
});

export const { setSignalChannelId, clearSignalChannelId, setSignalOwnerID } =
  signalSlice.actions;
export default signalSlice.reducer;
