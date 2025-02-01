import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addNewUserByAdmin: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/users/addnewuser",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddNewUserByAdminMutation } = adminUserApi;
