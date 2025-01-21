import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const userReferralApi = createApi({
  reducerPath: "userReferralApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserReferralCode: builder.query({
      query: ({ data }) => ({
        // data : username
        url: "/users/getrefferalcode",
        method: "POST",
        body: data,
      }),
    }),

    getUserReferrals: builder.query({
      query: ({ data }) => ({
        // data : username
        url: "/users/getuserbyrefferalcode",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserReferralsQuery, useGetUserReferralCodeQuery } =
  userReferralApi;
