import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const panelUsersApi = createApi({
  reducerPath: "panelUsersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // get courses
    getPanelAllUsers: builder.query({
      query: ({ data }) => ({
        url: "adminpanel/users/getallusers",
        method: "POST",
        body: data,
      }),
    }),

    getPanelUsersReport: builder.query({
      query: ({ data }) => ({
        url: "adminpanel/users/getalltotalusers",
        method: "POST",
        body: data,
      }),
    }),

    addNewUserByAdmin: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/users/addnewuser",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPanelAllUsersQuery,
  useAddNewUserByAdminMutation,
  useGetPanelUsersReportQuery,
} = panelUsersApi;
