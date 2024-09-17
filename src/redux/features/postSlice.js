import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createGroupPost = createAsyncThunk(
  "post/createGroupPost",
  async (
    { axiosPrivate, data, toast, resetForm, setSelectedCategories },
    { rejectWithValue }
  ) => {
    console.log({ data });
    try {
      const response = await axiosPrivate.post(
        "/api/createforummessage",
        JSON.stringify(data)
      );

      console.log({ response });
      if (response?.status === 200) {
        resetForm();
        setSelectedCategories([]);
      }
      return response.data;
    } catch (error) {
      console.log("userlist error", error);
      return rejectWithValue(error);
    }
  }
);

export const createPostComment = createAsyncThunk(
  "post/createPostComment",
  async ({ axiosPrivate, data, toast, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/createforummessage", data);

      console.log({ response });
      if (response?.status === 200) {
        toast.success("Comment added successfully.");
        resetForm();
      }
      return response.data;
    } catch (error) {
      console.log("postcomment error", error);
      return rejectWithValue(error);
    }
  }
);

export const getGroupPosts = createAsyncThunk(
  "post/getGroupPosts",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    console.log({ data });
    try {
      const response = await axiosPrivate.post("/api/getforummessage", data);

      console.log("getPosts", { response });
      return response.data;
    } catch (error) {
      console.log("Posts error", error);
      return rejectWithValue(error);
    }
  }
);

export const getGroupPost = createAsyncThunk(
  "post/getGroupPost",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    console.log({ data });
    try {
      const response = await axiosPrivate.post("/api/getforummessage", data);

      console.log("getPost", { response });
      return response.data;
    } catch (error) {
      console.log("Post error", error);
      return rejectWithValue(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "post/getPostComments",
  async ({ axiosPrivate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getforummessage", data);
      return { parentId: data.parentId, comments: response.data.messageData };
      // console.log("getcomments", { response });
      // return response.data;
    } catch (error) {
      console.log("userlist error", error);
      return rejectWithValue(error);
    }
  }
);

export const addPostMessageFile = createAsyncThunk(
  "signal/addPostMessagePic",
  async ({ axiosPrivate, formData, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/addforummessagepic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("PostImg", { response });

      return response.data;
    } catch (error) {
      console.log("psotImgerror", error);
      if (error?.message) {
        toast.error(error?.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (
    { axiosPrivate, data, toast, setDeletingPostId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPrivate.post("/api/deleteforummessage", data);

      console.log({ response });
      if (response?.status === 200) {
        toast.success("Post removed.");
        setDeletingPostId(null);
      }
      return response.data;
    } catch (error) {
      console.log("userlist error", error);
      return rejectWithValue(error);
    }
  }
);

export const addPostReaction = createAsyncThunk(
  "post/addPostReaction",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/createforummessagereaction",
        data
      );

      console.log("addPostReaction", { response });
      if (response?.status === 200) {
        toast.success("Reaction registered.");
      }
      return response.data;
    } catch (error) {
      console.log("addPostReaction error", error);
      return rejectWithValue(error);
    }
  }
);

export const getPostReactions = createAsyncThunk(
  "post/getPostReactions",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/getforummessagereaction",
        data
      );

      console.log("getPostReactions", { response });

      return response.data;
    } catch (error) {
      console.log("getPostReactions error", error);
      return rejectWithValue(error);
    }
  }
);

const groupPostSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    errorMsg: null,
    creatPostLoading: false,
    postCommentsLoading: false,
    removePostLoading: false,
    postReactionLoading: false,
    getPostLoading: false,
    postReactions: [],
    postReaction: {},
    post: {},
    posts: [],
    postComment: {},
    commentsByPostId: {},
    postComments: [],
    commentLoading: false,
    commentError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupPosts.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupPosts.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.posts = [...state.posts, ...action?.payload?.messageData];
        state.errorMsg = null;
      })
      .addCase(getGroupPosts.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })
      // ///////////////////////
      .addCase(createGroupPost.pending, (state) => {
        state.creatPostLoading = true;
        state.errorMsg = null;
      })
      .addCase(createGroupPost.fulfilled, (state, action) => {
        console.log({ action });
        state.creatPostLoading = false;
        state.posts.unshift(action.payload.messageData);
        state.errorMsg = null;
      })
      .addCase(createGroupPost.rejected, (state, action) => {
        console.log({ action });
        state.creatPostLoading = false;
        state.errorMsg = action.payload;
      })
      // -----------------------------------
      .addCase(createPostComment.pending, (state) => {
        state.commentLoading = true;
        state.commentError = null;
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        console.log({ action });
        state.commentLoading = false;
        state.postComment = action.payload?.messageData;
        const newComment = action.payload.messageData;
        state.postComments.unshift(newComment);
        state.commentError = null;
      })
      .addCase(createPostComment.rejected, (state, action) => {
        console.log({ action });
        state.commentLoading = false;
        state.commentError = action.payload;
      })

      // f2b9bf82-d4a6-4732-861e-0c62cd27eb19 COMUID
      // fafccc89-b1d2-4d2f-b7db-f984ae1a0a62 PARENT ID

      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

      .addCase(getPostComments.pending, (state) => {
        state.postCommentsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.postCommentsLoading = false;
        const { parentId, comments } = action.payload;
        state.commentsByPostId[parentId] = comments;
        state.errorMsg = null;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        console.log({ action });
        state.postCommentsLoading = false;
        state.errorMsg = action.payload;
      })

      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.errorMsg = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.errorMsg = null;
        state.post = action?.payload?.messageData;
      })
      .addCase(removePost.rejected, (state, action) => {
        console.log({ action });
        state.removePostLoading = false;
        state.errorMsg = action.payload;
      })

      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

      .addCase(addPostReaction.pending, (state) => {
        state.postReactionLoading = true;
        state.errorMsg = null;
      })
      .addCase(addPostReaction.fulfilled, (state, action) => {
        state.postReactionLoading = false;
        state.errorMsg = null;
        state.postReaction = action?.payload?.messageData;
      })
      .addCase(addPostReaction.rejected, (state, action) => {
        console.log({ action });
        state.postReactionLoading = false;
        state.errorMsg = action.payload;
      })

      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

      .addCase(getPostReactions.pending, (state) => {
        state.postReactionLoading = true;
        state.errorMsg = null;
      })
      .addCase(getPostReactions.fulfilled, (state, action) => {
        state.postReactionLoading = false;
        state.errorMsg = null;
        state.postReactions = action?.payload?.messageData;
      })
      .addCase(getPostReactions.rejected, (state, action) => {
        console.log({ action });
        state.postReactionLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(addPostMessageFile.pending, (state) => {
        state.creatPostLoading = true;
        state.errorMsg = null;
      })
      .addCase(addPostMessageFile.fulfilled, (state, action) => {
        state.creatPostLoading = false;
        state.errorMsg = null;
      })
      .addCase(addPostMessageFile.rejected, (state, action) => {
        console.log({ action });
        state.creatPostLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(getGroupPost.pending, (state) => {
        state.getPostLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupPost.fulfilled, (state, action) => {
        state.getPostLoading = false;
        state.post = action.payload.messageData[0];
        state.errorMsg = null;
      })
      .addCase(getGroupPost.rejected, (state, action) => {
        console.log({ action });
        state.getPostLoading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default groupPostSlice.reducer;
