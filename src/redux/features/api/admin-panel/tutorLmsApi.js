import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const tutorLmsApi = createApi({
  reducerPath: "tutorLmsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllTutorTags: builder.query({
      query: ({ data }) => ({
        url: "/adminpanel/gettutortags",
        method: "POST",
        body: data,
      }),
    }),
    addNewTutorTag: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/addnewtutortag",
        method: "POST",
        body: data,
      }),
    }),

    addNewCourseAnnoucement: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/addnewannouncement",
        method: "POST",
        body: data,
      }),
    }),

    getCourseAnnouncements: builder.query({
      query: ({ data }) => ({
        url: "/adminpanel/getannouncements",
        method: "POST",
        body: data,
      }),
    }),

    removeCourseAnnouncement: builder.mutation({
      query: ({ data }) => ({
        url: "/adminpanel/deleteannouncement",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddNewTutorTagMutation,
  useGetAllTutorTagsQuery,
  useAddNewCourseAnnoucementMutation,
  useGetCourseAnnouncementsQuery,
  useRemoveCourseAnnouncementMutation
} = tutorLmsApi;
