import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LearnToTradeApi = createApi({
  reducerPath: "LearnToTradeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("loginToken");

      // If we have a token, include it in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    addNewLTRTopic: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/addnewtopic",
        method: "POST",
        body: data,
      }),
    }),

    getLTRTopics: builder.query({
      query: ({ data }) => ({
        url: "/learntotrade/gettopics",
        method: "POST",
        body: data,
      }),
    }),

    removeTopic: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/deletetopic",
        method: "POST",
        body: data,
      }),
    }),

    // ============ Podcsts
    addNewLTRPodcast: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/addnewpodcast",
        method: "POST",
        body: data,
      }),
    }),

    getLTRPodcasts: builder.query({
      query: ({ data }) => ({
        url: "/learntotrade/getpodcasts",
        method: "POST",
        body: data,
      }),
    }),

    removeLTRPodcast: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/deletepodcast",
        method: "POST",
        body: data,
      }),
    }),

    //============= webinar
    addNewLTRWebinar: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/addnewpodcast",
        method: "POST",
        body: data,
      }),
    }),

    getLTRWebinars: builder.query({
      query: ({ data }) => ({
        url: "/learntotrade/getpodcasts",
        method: "POST",
        body: data,
      }),
    }),

    removeLTRWebinar: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/deletepodcast",
        method: "POST",
        body: data,
      }),
    }),

    //============= E-Book
    addNewLTREBook: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/addnewbook",
        method: "POST",
        body: data,
      }),
    }),

    getLTREBooks: builder.query({
      query: ({ data }) => ({
        url: "/learntotrade/getpodcasts",
        method: "POST",
        body: data,
      }),
    }),

    removeLTREBook: builder.mutation({
      query: ({ data }) => ({
        url: "/learntotrade/deletepodcast",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddNewLTRTopicMutation,
  useGetLTRTopicsQuery,
  useRemoveTopicMutation,

  useAddNewLTRPodcastMutation,
  useGetLTRPodcastsQuery,
  useRemoveLTRPodcastMutation,

  useAddNewLTRWebinarMutation,
  useGetLTRWebinarsQuery,
  useRemoveLTRWebinarMutation,

  useAddNewLTREBookMutation,
  useGetLTREBooksQuery,
  useRemoveLTREBookMutation
} = LearnToTradeApi;
