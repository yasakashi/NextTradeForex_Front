import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userDataAction = createAsyncThunk(
  "user/userDataAction",
  async ({ axiosPrivate, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/checktoken");

      console.log("userdata response", { response });
      if (response?.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.messageData)
        );
        toast.success("Login successfully.");
        if (
          response?.data?.messageData?.userTypeId === 1 ||
          response?.data?.messageData?.userTypeId === 2
        ) {
          navigate("/admin-panel");
        } else {
          navigate("/");
        }
      }
      return response.data;
    } catch (error) {
      console.log("login error", error);
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/users/update",
        JSON.stringify(data)
      );

      console.log("updateuser", { response });
      if (response?.data?.messageCode === 200) {
        toast.success("User updated successfully.");
      }
      return response.data;
    } catch (error) {
      console.log("updateuser error", error);

      if (error.response?.status === 400) {
        if (error.response?.data?.title)
          toast.error(error.response?.data?.title);
      }
      if (error?.message) {
        toast.error(error?.message);
      }
      rejectWithValue(error);
    }
  }
);

export const resetUserPasswordAction = createAsyncThunk(
  "user/resetUserPasswordAction",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/users/changeuserpass",
        JSON.stringify(data)
      );

      console.log("changepass", { response });
      if (response?.data?.messageCode === 403) {
        toast.error("Current password is wrong!");
      }

      if (response?.data?.messageCode === 200) {
        toast.success("Password changed successfully.");
      }

      return response.data;
    } catch (error) {
      console.log("changepass error", error);

      if (error.response?.status === 400) {
        if (error.response?.data?.title)
          toast.error(error.response?.data?.title);
      }
      if (error?.message) {
        toast.error(error?.message);
      }
      rejectWithValue(error);
    }
  }
);

const CheckUserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    updateUserLoading: false,
    errorMsg: null,
    userData: {},
    updatedUserData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userDataAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(userDataAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(userDataAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })

      // 0000000000000000000000000000
      .addCase(updateUserProfile.pending, (state) => {
        state.updateUserLoading = true;
        state.errorMsg = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log({ action });
        state.updateUserLoading = false;
        state.updatedUserData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.log({ action });
        state.updateUserLoading = false;
        state.errorMsg = action.payload;
      })
      // 0000000000000000000000000000
      .addCase(resetUserPasswordAction.pending, (state) => {
        state.updateUserLoading = true;
        state.errorMsg = null;
      })
      .addCase(resetUserPasswordAction.fulfilled, (state, action) => {
        console.log({ action });
        state.updateUserLoading = false;
        state.updatedUserData = action.payload;
      })
      .addCase(resetUserPasswordAction.rejected, (state, action) => {
        console.log({ action });
        state.updateUserLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default CheckUserSlice.reducer;
