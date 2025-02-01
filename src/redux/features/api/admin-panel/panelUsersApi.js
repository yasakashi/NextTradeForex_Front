import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const panelUsersApi = createApi({
  reducerPath: "panelUsersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // get courses
    getPanelAllUsers: builder.query({
      query: ({data}) => ({
        url: "adminpanel/users/getallusers",
        method: "POST",
        body:data
      }),
    }),
  }),
});

export const { useGetPanelAllUsersQuery } = panelUsersApi;
