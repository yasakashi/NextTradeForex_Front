import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminPanelTools = createApi({
  reducerPath: "adminPanelTools",
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
    // ============ Podcsts
    addNewToolsPodcast: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/addnewpodcast",
        method: "POST",
        body: data,
      }),
    }),

    getToolsPodcasts: builder.query({
      query: ({ data }) => ({
        url: "/adminpanel/tools/getpodcasts",
        method: "POST",
        body: data,
      }),
    }),

    removeToolsPodcast: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/deletepodcast",
        method: "POST",
        body: data,
      }),
    }),

    //============= webinar
    addNewToolsWebinar: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/addnewwebinar",
        method: "POST",
        body: data,
      }),
    }),

    getToolsWebinars: builder.query({
      query: ({ data }) => ({
        url: "/adminpanel/tools/getwebinars",
        method: "POST",
        body: data,
      }),
    }),

    removeToolsWebinar: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/addnewwebinar",
        method: "POST",
        body: data,
      }),
    }),

    //============= E-Book
    addNewToolsEBook: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/addnewbook",
        method: "POST",
        body: data,
      }),
    }),

    getToolsEBooks: builder.query({
      query: ({ data }) => ({
        url: "/adminpanel/tools/getbooks",
        method: "POST",
        body: data,
      }),
    }),

    removeToolsEBook: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/tools/editbook",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddNewToolsPodcastMutation,
  useGetToolsPodcastsQuery,
  useRemoveToolsPodcastMutation,

  useAddNewToolsWebinarMutation,
  useGetToolsWebinarsQuery,
  useRemoveToolsWebinarMutation,

  useAddNewToolsEBookMutation,
  useGetToolsEBooksQuery,
  useRemoveToolsEBookMutation,
} = adminPanelTools;
