import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
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
    // add new topic
    addNewCourse: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addcourse",
        method: "POST",
        body: data,
      }),
    }),

    // add course meeting
    addCourseMeeting: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addcoursemeeting",
        method: "POST",
        body: data,
      }),
    }),

    // add video pdf
    addCourseVideoPdf: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addcoursevideopdfurl",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddNewCourseMutation,
  useAddCourseMeetingMutation,
  useAddCourseVideoPdfMutation,
} = courseApi;
