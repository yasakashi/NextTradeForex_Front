import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseBuilderApi = createApi({
  reducerPath: "courseBuilderApi",
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
    addCourseTopic: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addcoursetopic",
        method: "POST",
        body: data,
      }),
    }),

    // get course topics
    getCourseTopics: builder.mutation({
      query: ({ courseId, pageindex = 1, rowcount = 10 }) => ({
        url: "/coursebuilder/getcoursetopics",
        method: "POST", // Corrected to uppercase
        body: {
          courseId,
          pageindex,
          rowcount,
        },
      }),
    }),
  }),
});

export const { useAddCourseTopicMutation, useGetCourseTopicsMutation } =
  courseBuilderApi;
