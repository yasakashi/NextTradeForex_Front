import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axiosInstance";

export const loginAction = createAsyncThunk(
  "login/loginAction",
  async ({ values, toast }, { rejectWithValue }) => {
    const authData = `${values.username}:${values.password}`;
    const authToken = btoa(authData);

    const data = JSON.stringify({
      username: values.username,
      password: values.password,
    });
    try {
      const response = await axiosInstance.post("/api/gettoken", data, {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        localStorage.setItem("username", values.username);
      }

      console.log("login response", { response });
      return response.data;
    } catch (error) {
      console.log("login error", error);
      if (error?.response?.status === 400) {
        toast.error("Username or Password is incurrect!.");
      } else if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "login/logoutAction",
  async ({ axiosPrivate , toast, navigate}, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/signout");
      if (response?.status === 200) {
        toast.success("Logout successfully.")
        localStorage.removeItem("loginToken");
        localStorage.removeItem("user");
        localStorage.removeItem("username")
        navigate("/")
      }

      console.log("logout response", { response });
      return response.data;
    } catch (error) {
      console.log("logout error", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    errorMsg: null,
    loginToken: localStorage.getItem("loginToken") || "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.loginToken = localStorage.setItem(
          "loginToken",
          action?.payload?.messageData
        );
      })
      .addCase(loginAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default loginSlice.reducer;
