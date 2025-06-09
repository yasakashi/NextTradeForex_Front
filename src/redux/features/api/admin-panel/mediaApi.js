import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const adminMediaApi = createApi({
  reducerPath: "adminMediaApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addNewMedia: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/addnewmedia",
        method: "POST",
        body: data,
      }),
    }),
    getAllMedias: builder.query({
      query: ({ data }) => ({
        url: "/learntotrade/getmedias",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddNewMediaMutation, useGetAllMediasQuery } = adminMediaApi;
