import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const adminData = createApi({
  reducerPath: "adminData",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // get courses
    getAdminSiteData: builder.query({
      query: () => ({
        url: "/adminpanel/adminData",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminSiteDataQuery } = adminData;
