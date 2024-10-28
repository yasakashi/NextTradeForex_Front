import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createGroupAction = createAsyncThunk(
  "group/createGroupAction",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/addcommunitygroup", data);
      return response.data;
    } catch (error) {
      console.log("creat group error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      rejectWithValue(error);
    }
  }
);

export const editGroupDetail = createAsyncThunk(
  "group/editGroupDetail",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axiosPrivate.post("/api/editcommunitygroup", data);
      console.log("editgroup", response);
      if (response.status === 200) {
        toast.success("Group Updated.");
      }
      return response.data;
    } catch (error) {
      console.log("creat group error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const removeGroup = createAsyncThunk(
  "group/removeGroup",
  async ({ axiosPrivate, toast, id, data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/removecommunitygroups", data);

      console.log("removegroup", { response });

      if (response?.status === 200) {
        toast.success("Group removed successfully.");
        navigate("/traders-community/groups");
      }

      return response.data;
    } catch (error) {
      console.log("removegroup", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getAllGroups = createAsyncThunk(
  "group/getAllGroups",
  async ({ axiosPrivate, toast, sortitem, title }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getcommunitygroups", {
        owneruserid: null,
        title,
        sortitem,
        grouptypeId: null,
        // rowcount: 8,
        // pageindex: ,
      });

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("all groups error", error);
      if (error?.message) {
        console.log(error?.message);
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getUserGroups = createAsyncThunk(
  "group/getUserGroups",
  async ({ axiosPrivate, toast, sortitem }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getusercommunitygroups", {
        categoryid: null,
        owneruserid: null,
        sortitem,
      });

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log("uer groups error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getGroup = createAsyncThunk("group/getGroup", async ({ axiosPrivate, toast, id }, { rejectWithValue }) => {
  console.log({ id });
  try {
    const response = await axiosPrivate.post(
      "/api/getcommunitygroups",
      JSON.stringify({
        owneruserid: null,
        grouptypeId: null,

        id,
      })
    );

    console.log("getGroup", { response });

    return response.data;
  } catch (error) {
    console.log("uer groups error", error);
    if (error?.message) {
      toast.error(error.message);
    }
    return rejectWithValue(error);
  }
});

export const reqeustToJoinTheGroupAction = createAsyncThunk(
  "group/reqeustToJoinTheGroupAction",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/addcommunitygroupmember", data);

      console.log({ response });
    } catch (error) {
      console.log("request to join the group", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getPopularGroups = createAsyncThunk(
  "group/getPopularGroups",
  async ({ axiosPrivate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/gettopcommunitygroups", {
        showdetail: true,
      });

      console.log("popularGroups", { response });

      return response.data;
    } catch (error) {
      console.log("popularGroups", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getAcceptedGroupMembers = createAsyncThunk(
  "group/getAcceptedGroupMembers",
  async ({ axiosPrivate, communitygroupId, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getcommunitygroupmember", {
        communitygroupId,
        isaccepted: true,
      });

      console.log("accepted group members", { response });
      return response?.data;
    } catch (error) {
      console.log("accepted group members", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getAllMembershipRequests = createAsyncThunk(
  "group/getAllMembershipRequests",
  async ({ axiosPrivate, communitygroupId, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/getcommunitygroupmember", {
        communitygroupId,
        isaccepted: false,
      });

      console.log("requested users", { response });
      return response.data;
    } catch (error) {
      console.log("request to join the group", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const acceptMembershipRequest = createAsyncThunk(
  "group/acceptMembershipRequest",
  async ({ axiosPrivate, data, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/acceptcommunitygroupmember", data);

      if (response?.status === 200) {
        toast.success(response?.data?.messageDescription);
      }

      console.log("requested users", { response });
      return response.data;
    } catch (error) {
      console.log("request to join the group", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getGroupCategory = createAsyncThunk(
  "group/getGroupCategory",
  async ({ axiosPrivate, toast, parentId }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(
        "/api/getcategorytree",
        { parentId },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("getCategory error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const setCommunityGroupPic = createAsyncThunk(
  "group/setCommunityGroupPic",
  async ({ axiosPrivate, toast, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/setcommunitygrouppic", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("setCommunityGroupPic", { response });

      return response.data;
    } catch (error) {
      console.log("setCommunityGroupPic error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const setCommunityGroupCoverImage = createAsyncThunk(
  "group/setCommunityGroupCoverImage",
  async ({ axiosPrivate, toast, data }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/setcommunitycoverpic", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("setCommunityGroupCoverImage", { response });

      return response.data;
    } catch (error) {
      console.log("setCommunityGroupCoverImage error", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const getGroupImage = createAsyncThunk(
  "group/getGroupImage",
  async ({ axiosPrivate, id }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/api/getcommunitygroupimageurl/${id}`, {
        responseType: "arraybuffer", // Important to handle binary data
      });

      console.log("getGroupImage", { response });

      return response.data;
    } catch (error) {
      console.log("getGroupImage error", error);

      return rejectWithValue(error);
    }
  }
);

export const getGroupCoverImg = createAsyncThunk(
  "group/getGroupCoverImg",
  async ({ axiosPrivate, id }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/api/getcommunitycoverimageurl/${id}`, {
        responseType: "arraybuffer", // Important to handle binary data
      });

      console.log("getGroupCoverImg", { response });

      return response.data;
    } catch (error) {
      console.log("getGroupCoverImg error", error);

      return rejectWithValue(error);
    }
  }
);

export const chagneGroupUserType = createAsyncThunk(
  "group/chagneGroupUserType",
  async ({ axiosPrivate, toast, id, data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post("/api/changecommunitygroupmembertype", data);

      console.log("chagneGroupUserType", { response });

      if (response?.status === 200) {
        toast.success("User type changed.");
      }

      return response.data;
    } catch (error) {
      console.log("chagneGroupUserType", error);
      if (error?.message) {
        toast.error(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    isLoading: false,
    getGroupLoading: false,
    popularGroupsLoading: false,
    membersLoading: false,
    setGroupPicLoading: false,
    groupsForDisplayLoading: false,
    editGroupLoading: false,
    getGroupImgLoading: false,
    acceptMemberShipLoading: false,
    changeUserTypeLoading: false,
    groupImg: "",
    groupCoverImg: "",
    errorMsg: null,
    groupData: {},
    allGroups: [],
    userGroups: [],
    popularGroups: [],
    acceptedMembers: [],
    membershipRequest: [],
    groupsForDisplay: [],
    groupDetail: {},
    createGroupStatus: "",
    requestToJoin: "",
    groupId: localStorage.getItem("groupId") || "",
    group: {},
    groupCategories: [],
    groupCoverPic: "",
    getCategoryLoading: false,
  },
  reducers: {
    setGroupId: (state, action) => {
      console.log({ action });
      state.groupId = action.payload;
      localStorage.setItem("groupId", action.payload); // Save to localStorage
    },
    clearGroupId: (state) => {
      state.groupId = "";
      localStorage.removeItem("groupId"); // Remove from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroupAction.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(createGroupAction.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = null;
        state.groupData = action.payload?.messageData;
        state.createGroupStatus = action.payload?.messageCode;
      })
      .addCase(createGroupAction.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(getAllGroups.pending, (state) => {
        state.isLoading = true;
        state.groupsForDisplayLoading = true;
        state.errorMsg = null;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.groupsForDisplayLoading = false;
        state.errorMsg = null;
        state.allGroups = action.payload?.messageData;
        state.groupsForDisplay = action.payload?.messageData;
        state.createGroupStatus = action.payload?.messageCode;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.groupsForDisplayLoading = false;
        state.errorMsg = action.payload;
      })

      .addCase(getUserGroups.pending, (state) => {
        state.isLoading = true;
        state.groupsForDisplayLoading = true;
        state.errorMsg = null;
      })
      .addCase(getUserGroups.fulfilled, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.groupsForDisplayLoading = false;
        state.errorMsg = null;
        state.userGroups = action.payload?.messageData;
        state.groupsForDisplay = action.payload?.messageData;
        state.createGroupStatus = action.payload?.messageCode;
      })
      .addCase(getUserGroups.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.groupsForDisplayLoading = false;
        state.errorMsg = action.payload;
      })

      // ///////////////////////////
      .addCase(getGroup.pending, (state) => {
        state.getGroupLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        console.log("getGroup", { action });
        state.getGroupLoading = false;
        state.errorMsg = null;
        state.group = action.payload?.messageData[0];
      })
      .addCase(getGroup.rejected, (state, action) => {
        console.log({ action });
        state.getGroupLoading = false;
        state.errorMsg = action.payload;
      })

      // ************************
      .addCase(getPopularGroups.pending, (state) => {
        state.popularGroupsLoading = true;
        state.errorMsg = null;
      })
      .addCase(getPopularGroups.fulfilled, (state, action) => {
        console.log({ action });
        state.popularGroupsLoading = false;
        state.errorMsg = null;
        state.popularGroups = action.payload?.messageData;
      })
      .addCase(getPopularGroups.rejected, (state, action) => {
        console.log({ action });
        state.popularGroupsLoading = false;
        state.errorMsg = action.payload;
      })
      // ************************
      .addCase(getAcceptedGroupMembers.pending, (state) => {
        state.membersLoading = true;
        state.errorMsg = null;
      })
      .addCase(getAcceptedGroupMembers.fulfilled, (state, action) => {
        console.log({ action });
        state.membersLoading = false;
        state.errorMsg = null;
        state.acceptedMembers = action.payload?.messageData;
      })
      .addCase(getAcceptedGroupMembers.rejected, (state, action) => {
        console.log({ action });
        state.membersLoading = false;
        state.errorMsg = action.payload;
      })
      // ************************
      .addCase(getAllMembershipRequests.pending, (state) => {
        state.membersLoading = true;
        state.errorMsg = null;
      })
      .addCase(getAllMembershipRequests.fulfilled, (state, action) => {
        console.log({ action });
        state.membersLoading = false;
        state.errorMsg = null;
        state.membershipRequest = action.payload?.messageData;
      })
      .addCase(getAllMembershipRequests.rejected, (state, action) => {
        console.log({ action });
        state.membersLoading = false;
        state.errorMsg = action.payload;
      })

      // ///////////////////////////
      .addCase(getGroupCategory.pending, (state) => {
        state.getCategoryLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupCategory.fulfilled, (state, action) => {
        console.log("getGroupCategory", { action });
        state.getCategoryLoading = false;
        state.errorMsg = null;
        state.groupCategories = action.payload?.messageData;
      })
      .addCase(getGroupCategory.rejected, (state, action) => {
        console.log({ action });
        state.getCategoryLoading = false;
        state.errorMsg = action.payload;
      })
      // ----------------------------

      .addCase(setCommunityGroupPic.pending, (state) => {
        state.setGroupPicLoading = true;
        state.errorMsg = null;
      })
      .addCase(setCommunityGroupPic.fulfilled, (state, action) => {
        console.log("setCommunityGroupPic", { action });
        state.setGroupPicLoading = false;
        state.errorMsg = null;
        state.groupCoverPic = action.payload?.messageData;
        state.group = action?.payload?.messageData[0];
      })
      .addCase(setCommunityGroupPic.rejected, (state, action) => {
        console.log({ action });
        state.setGroupPicLoading = false;
        state.errorMsg = action.payload;
      })

      // ----------------------------

      .addCase(getGroupCoverImg.pending, (state) => {
        state.setGroupPicLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupCoverImg.fulfilled, (state, action) => {
        console.log("getGroupCoverImg", { action });
        state.setGroupPicLoading = false;
        state.errorMsg = null;
        state.groupCoverImg = action.payload?.messageData;
      })
      .addCase(getGroupCoverImg.rejected, (state, action) => {
        console.log({ action });
        state.setGroupPicLoading = false;
        state.errorMsg = action.payload;
      })

      // ----------------------------

      .addCase(removeGroup.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(removeGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMsg = null;
      })
      .addCase(removeGroup.rejected, (state, action) => {
        console.log({ action });
        state.isLoading = false;
        state.errorMsg = action.payload;
      })
      // -------------------------------

      .addCase(editGroupDetail.pending, (state) => {
        state.editGroupLoading = true;
        state.errorMsg = null;
      })
      .addCase(editGroupDetail.fulfilled, (state, action) => {
        state.editGroupLoading = false;
        state.groupDetail = action.payload?.messageData;
        state.errorMsg = null;
      })
      .addCase(editGroupDetail.rejected, (state, action) => {
        console.log({ action });
        state.editGroupLoading = false;
        state.errorMsg = action.payload;
      })
      // -------------------------------

      .addCase(getGroupImage.pending, (state) => {
        state.getGroupImgLoading = true;
        state.errorMsg = null;
      })
      .addCase(getGroupImage.fulfilled, (state, action) => {
        console.log({ action });
        state.getGroupImgLoading = false;
        state.errorMsg = null;
        state.groupImg = action?.payload?.messageData;
      })
      .addCase(getGroupImage.rejected, (state, action) => {
        console.log({ action });
        state.getGroupImgLoading = false;
        state.errorMsg = action.payload;
      })

      // -------------------------------

      .addCase(setCommunityGroupCoverImage.pending, (state) => {
        state.setGroupPicLoading = true;
        state.errorMsg = null;
      })
      .addCase(setCommunityGroupCoverImage.fulfilled, (state, action) => {
        console.log({ action });
        state.setGroupPicLoading = false;
        state.errorMsg = null;
        state.groupCoverImg = action?.payload?.messageData;
        // state.group = action.payload?.messageData[0];
      })
      .addCase(setCommunityGroupCoverImage.rejected, (state, action) => {
        console.log({ action });
        state.setGroupPicLoading = false;
        state.errorMsg = action.payload;
      })

      // -------------------------------

      .addCase(acceptMembershipRequest.pending, (state) => {
        state.acceptMemberShipLoading = true;
        state.errorMsg = null;
      })
      .addCase(acceptMembershipRequest.fulfilled, (state, action) => {
        console.log({ action });
        state.acceptMemberShipLoading = false;
        state.errorMsg = null;
        state.group = action?.payload?.messageData[0];
      })
      .addCase(acceptMembershipRequest.rejected, (state, action) => {
        console.log({ action });
        state.acceptMemberShipLoading = false;
        state.errorMsg = action.payload;
      })

      // -------------------------------

      .addCase(chagneGroupUserType.pending, (state) => {
        state.changeUserTypeLoading = true;
        state.errorMsg = null;
      })
      .addCase(chagneGroupUserType.fulfilled, (state, action) => {
        console.log({ action });
        state.changeUserTypeLoading = false;
        state.errorMsg = null;
        state.group = action?.payload?.messageData[0];
      })
      .addCase(chagneGroupUserType.rejected, (state, action) => {
        console.log({ action });
        state.changeUserTypeLoading = false;
        state.errorMsg = action.payload;
      });
  },
});
export const { setGroupId, clearGroupId } = groupSlice.actions;
export default groupSlice.reducer;
