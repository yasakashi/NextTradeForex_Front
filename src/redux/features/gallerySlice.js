import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGallery = createAsyncThunk(
  "gallery/createGallery",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/gallery/creategallery",
        data
      );
      return response.data;
    } catch (error) {
      console.log("creat gallery error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getGalleries = createAsyncThunk(
  "gallery/getGalleries",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/gallery/getgallery", data);
      return response.data;
    } catch (error) {
      console.log("get gallery error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getMyGalleries = createAsyncThunk(
  "gallery/getMyGalleries",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/gallery/getgallery", data);
      return response.data;
    } catch (error) {
      console.log("get gallery error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    createGalleryLoading: false,
    getGalleriesLoading: false,
    galleries: [],
    myGalleries: [],
    gallery: {},
    errorMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGallery.pending, (state) => {
        state.createGalleryLoading = true;
        state.errorMsg = null;
      })
      .addCase(createGallery.fulfilled, (state, action) => {
        console.log({ action });
        state.createGalleryLoading = false;
        state.errorMsg = null;
        state.gallery = action.payload?.messageData;
      })
      .addCase(createGallery.rejected, (state, action) => {
        console.log({ action });
        state.createGalleryLoading = false;
        state.errorMsg = action.payload;
      })
      .addCase(getGalleries.pending, (state) => {
        state.getGalleriesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGalleries.fulfilled, (state, action) => {
        console.log({ action });
        state.getGalleriesLoading = false;
        state.errorMsg = null;
        state.galleries = action.payload?.messageData;
      })
      .addCase(getGalleries.rejected, (state, action) => {
        console.log({ action });
        state.getGalleriesLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(getMyGalleries.pending, (state) => {
        state.getGalleriesLoading = true;
        state.errorMsg = null;
      })
      .addCase(getMyGalleries.fulfilled, (state, action) => {
        console.log({ action });
        state.getGalleriesLoading = false;
        state.errorMsg = null;
        state.myGalleries = action.payload?.messageData;
      })
      .addCase(getMyGalleries.rejected, (state, action) => {
        console.log({ action });
        state.getGalleriesLoading = false;
        state.errorMsg = action.payload;
      });
  },
});
// export const { setGroupId, clearGroupId } = gallerySlice.actions;
export default gallerySlice.reducer;
