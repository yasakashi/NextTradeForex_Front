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

    // remove course topic
    removeCourseTopic: builder.mutation({
      query: ({ data }) => ({
        // data: topic Id
        url: "/coursebuilder/deletecoursetopic",
        method: "POST",
        body: data,
      }),
    }),

    // get course topics
    getCourseTopics: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/getcoursetopics",
        method: "POST", // Corrected to uppercase
        body: data,
      }),
    }),

    // add topic lesson
    addTopicLesson: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addlesson",
        method: "POST",

        body: data,
      }),
    }),

    // remove topic lesson
    removeTopicLesson: builder.mutation({
      query: ({ data }) => ({
        // data: lesson Id
        url: "/coursebuilder/deleteLesson",
        method: "POST",
        body: data,
      }),
    }),

    // add topic lesson
    addTopicQuiz: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/addlessonquiz",
        method: "POST",
        body: data,
      }),
    }),

    // get topic lesson
    getTopicLessons: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/getLessons",
        method: "POST",

        body: data,
      }),
    }),

    // get topic quizes
    getTopicQuiz: builder.mutation({
      query: ({ data }) => ({
        url: "/coursebuilder/getLessonquizs",
        method: "POST",

        body: data,
      }),
    }),
  }),
});

export const {
  useAddCourseTopicMutation,
  useGetCourseTopicsMutation,
  useAddTopicLessonMutation,
  useGetTopicLessonsMutation,
  useRemoveCourseTopicMutation,
  useRemoveTopicLessonMutation, 
  useAddTopicQuizMutation,
  useGetTopicQuizMutation
} = courseBuilderApi;
