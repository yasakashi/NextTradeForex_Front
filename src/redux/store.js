import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./features/loginSlice";
import registerReducer from "./features/registerSlice";
import usersListReducer from "./features/admin/usersListSlice";
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
import { courseBuilderApi } from "./features/course/courseBuilderApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./features/course/courseApii";
import { commonApi } from "./features/course/commonApi";
import { marketPulseReducer } from "./features/marketPulse/marketPulseSlice";
import { loadingReducer } from "./features/loading";
import { categoriesApi } from "./features/categories/categoriesApi";
import { LearnToTradeApi } from "./features/learnToTrade/LearnToTradeApi";

const store = configureStore({
  reducer: {
    [courseBuilderApi.reducerPath]: courseBuilderApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [LearnToTradeApi.reducerPath]: LearnToTradeApi.reducer,

    login: loginReducer,
    auth: registerReducer,
    usersList: usersListReducer,
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
      LearnToTradeApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
