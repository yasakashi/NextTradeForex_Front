import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPartnershipList = createAsyncThunk(
  "group/getPartnershipList",
  async ({ axiosPrivate, toast, data }, { rejectWithValue }) => {
    console.log({data})
    try {
      const response = await axiosPrivate.post(
        "/api/users/getuserinstructors",
        JSON.stringify(data)
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("partnership error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

const partnershipSlice = createSlice({
  name: "group",
  initialState: {
    partnershipLoading: false,
    errorMsg: null,
    partnershipList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPartnershipList.pending, (state) => {
        state.partnershipLoading = true;
        state.errorMsg = null;
      })
      .addCase(getPartnershipList.fulfilled, (state, action) => {
        console.log({ action });
        state.partnershipLoading = false;
        state.partnershipList = action.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(getPartnershipList.rejected, (state, action) => {
        state.partnershipLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default partnershipSlice.reducer;
