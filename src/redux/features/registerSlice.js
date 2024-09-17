import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axiosInstance";

export const registerAction = createAsyncThunk(
  "register/registerAction",
  async ({ values, toast }) => {
    const authData = `${values.username}:${values.password}:${values.password}:${values.mobile}:${values.userTypeId}`;

    const authToken = btoa(authData);
    const data = JSON.stringify(values);
    

    try {
      const response = await axiosInstance.post("/api/users/create", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log({ response });
      return response.data;
    } catch (error) {
      if (error?.response?.data?.messageCode === -512) {
        toast.error("User already exist.");
      }
      console.log("catch error", { error });
    }
  }
);
// google registeration
export const googleRegisterAction = createAsyncThunk(
  "register/googleRegisterAction",
  async ({ token, email }) => {
    try {
      const response = await axiosInstance.post("/api/users/create", {
        token,
        email,
      });

      console.log({ response });
      return response.data;
    } catch (error) {
      console.log("catch error", { error });
      throw error; // ensure error is propagated
    }
  }
);

export const getCountries = createAsyncThunk(
  "register/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/getcountries");

      console.log("countries", { response });
      return response.data;
    } catch (error) {
      console.log("countries error", { error });
      return rejectWithValue(error);
    }
  }
);

export const getStates = createAsyncThunk(
  "register/getStates",
  async ({ countryid }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/getstates", {
        countryid,
      });

      console.log("states", { response });
      return response.data;
    } catch (error) {
      console.log("states error", { error });
      return rejectWithValue(error);
    }
  }
);

export const getcities = createAsyncThunk(
  "register/getcities",
  async ({ countryid = null, stateid }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/getcities", {
        countryid,
        stateid,
      });

      console.log("cities", { response });
      return response.data;
    } catch (error) {
      console.log("cities error", { error });
      return rejectWithValue(error);
    }
  }
);

export const getinterestforexs = createAsyncThunk(
  "register/getinterestforexs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/getinterestforexs");

      console.log("getinterestforexs", { response });
      return response.data;
    } catch (error) {
      console.log("getinterestforexs error", { error });
      return rejectWithValue(error);
    }
  }
);

export const gettrainingmethods = createAsyncThunk(
  "register/gettrainingmethods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/gettrainingmethods");

      console.log("gettrainingmethods", { response });
      return response.data;
    } catch (error) {
      console.log("gettrainingmethods error", { error });
      return rejectWithValue(error);
    }
  }
);

export const gettargettrainers = createAsyncThunk(
  "register/gettargettrainers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/gettargettrainers");

      console.log("gettargettrainers", { response });
      return response.data;
    } catch (error) {
      console.log("gettargettrainers error", { error });
      return rejectWithValue(error);
    }
  }
);

export const getforexexperiencelevels = createAsyncThunk(
  "register/getforexexperiencelevels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/getforexexperiencelevels"
      );

      console.log("getforexexperiencelevels", { response });
      return response.data;
    } catch (error) {
      console.log("getforexexperiencelevels error", { error });
      return rejectWithValue(error);
    }
  }
);

export const getfinancialinstruments = createAsyncThunk(
  "register/getfinancialinstruments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/getfinancialinstruments");

      console.log("getfinancialinstruments", { response });
      return response.data;
    } catch (error) {
      console.log("getfinancialinstruments error", { error });
      return rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    countriesLoading: false,
    statesLoading: false,
    citiesLoading: false,
    forexInterestsLoading: false,
    trainingMethodsLoading: false,
    targetTrainersLoading: false,
    forexExperienceLevelLoading: false,
    financialInstrumentsLoading: false,
    countries: [],
    states: [],
    cities: [],
    forexInterests: [],
    trainingMethods: [],
    targetTrainers: [],
    forexExperincesLevel: [],
    financialInstruments: [],
    errorMsg: null,
    userData: {},
    messageCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.userData = action.payload?.messageData;
        state.messageCode = action.payload?.messageCode;

        state.errorMsg = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload;
        console.log({ action });
      })
      .addCase(googleRegisterAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(googleRegisterAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.userData = action.payload.messageData;
        state.messageCode = action.payload.messageCode;
        state.errorMsg = null;
      })
      .addCase(googleRegisterAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })
      // --------------- countries
      .addCase(getCountries.pending, (state) => {
        state.countriesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        console.log({ action });
        state.countriesLoading = false;
        state.countries = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.countriesLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })
      // --------------- states
      .addCase(getStates.pending, (state) => {
        state.statesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        console.log({ action });
        state.statesLoading = false;
        state.states = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.statesLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })
      // --------------- cities
      .addCase(getcities.pending, (state) => {
        state.citiesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getcities.fulfilled, (state, action) => {
        console.log({ action });
        state.citiesLoading = false;
        state.cities = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getcities.rejected, (state, action) => {
        state.citiesLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })

      // ___________________forex interests
      .addCase(getinterestforexs.pending, (state) => {
        state.forexInterestsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getinterestforexs.fulfilled, (state, action) => {
        console.log({ action });
        state.forexInterestsLoading = false;
        state.forexInterests = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getinterestforexs.rejected, (state, action) => {
        state.forexInterestsLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })

      // ___________________gettrainingmethods
      .addCase(gettrainingmethods.pending, (state) => {
        state.trainingMethodsLoading = true;
        state.errorMsg = null;
      })
      .addCase(gettrainingmethods.fulfilled, (state, action) => {
        console.log({ action });
        state.trainingMethodsLoading = false;
        state.trainingMethods = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(gettrainingmethods.rejected, (state, action) => {
        state.trainingMethodsLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })

      // gettargettrainers
      .addCase(gettargettrainers.pending, (state) => {
        state.trainingMethodsLoading = true;
        state.errorMsg = null;
      })
      .addCase(gettargettrainers.fulfilled, (state, action) => {
        console.log({ action });
        state.trainingMethodsLoading = false;
        state.targetTrainers = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(gettargettrainers.rejected, (state, action) => {
        state.trainingMethodsLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })

      // getforexexperiencelevels
      .addCase(getforexexperiencelevels.pending, (state) => {
        state.forexExperienceLevelLoading = true;
        state.errorMsg = null;
      })
      .addCase(getforexexperiencelevels.fulfilled, (state, action) => {
        console.log({ action });
        state.forexExperienceLevelLoading = false;
        state.forexExperincesLevel = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getforexexperiencelevels.rejected, (state, action) => {
        state.forexExperienceLevelLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      })
      // getfinancialinstruments
      .addCase(getfinancialinstruments.pending, (state) => {
        state.financialInstrumentsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getfinancialinstruments.fulfilled, (state, action) => {
        console.log({ action });
        state.financialInstrumentsLoading = false;
        state.financialInstruments = action.payload.messageData;

        state.errorMsg = null;
      })
      .addCase(getfinancialinstruments.rejected, (state, action) => {
        state.financialInstrumentsLoading = false;
        state.errorMsg = action.error.message;
        console.log({ action });
      });
  },
});

export default registerSlice.reducer;
