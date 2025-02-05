import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./features/loginSlice";
import registerReducer from "./features/registerSlice";
// import usersListReducer from "./features/admin/usersListSlice";
import userDataReducer from "./features/userDataSlice";
import userSendMessage from "./features/messages/sendMsgSlice";
import groupReducer from "./features/groupSlice";
import signalChannelReducer from "./features/signals/signalChannelsSlice";
import addSignalReducer from "./features/signals/SignalSlice";
import groupPostsReducer from "./features/postSlice";
import ticketReducer from "./features/tickeSlice";
import adminCourseReducer from "./features/learning/adminCourseSlice";
import partnershipReducer from "./features/partnershipSlice";
import galleryReducer from "./features/gallerySlice";
import siteMessageReducer from "./features/messageSlice";
import { generalReducer } from "./features/generalSlice";
import { courseReducer } from "./features/courseSlise";
import { courseBuilderApi } from "./features/api/course/courseBuilderApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./features/api/course/courseApii";
import { commonApi } from "./features/api/course/commonApi";
import { marketPulseReducer } from "./features/marketPulse/marketPulseSlice";
import { loadingReducer } from "./features/loading";
import { categoriesApi } from "./features/api/categories/categoriesApi";
import { LearnToTradeApi } from "./features/api/learnToTrade/LearnToTradeApi";
import { userReferralApi } from "./features/api/referral/userReferralApi";
import { adminData } from "./features/api/admin-panel/adminDataApi";
import { panelUsersApi } from "./features/api/admin-panel/panelUsersApi";
import { adminMediaApi } from "./features/api/admin-panel/mediaApi";
import { adminTicketsApi } from './features/api/admin-panel/adminTicketsApi';

const store = configureStore({
  reducer: {
    [courseBuilderApi.reducerPath]: courseBuilderApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [LearnToTradeApi.reducerPath]: LearnToTradeApi.reducer,
    [userReferralApi.reducerPath]: userReferralApi.reducer,
    [adminData.reducerPath]: adminData.reducer,
    [panelUsersApi.reducerPath]: panelUsersApi.reducer,
    [adminMediaApi.reducerPath]: adminMediaApi.reducer,
    [adminTicketsApi.reducerPath]: adminTicketsApi.reducer,

    login: loginReducer,
    auth: registerReducer,
    user: userDataReducer,
    userSendMessage: userSendMessage,
    group: groupReducer,
    signalChannel: signalChannelReducer,
    addSignal: addSignalReducer,
    posts: groupPostsReducer,
    ticket: ticketReducer,
    adminCourse: adminCourseReducer,
    partnership: partnershipReducer,
    gallery: galleryReducer,
    siteMessage: siteMessageReducer,
    general: generalReducer,
    course: courseReducer,
    marketPulse: marketPulseReducer,
    loading: loadingReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      courseBuilderApi.middleware,
      courseApi.middleware,
      commonApi.middleware,
      categoriesApi.middleware,
      LearnToTradeApi.middleware,
      userReferralApi.middleware,
      adminData.middleware,
      panelUsersApi.middleware,
      adminMediaApi.middleware,
      adminTicketsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
