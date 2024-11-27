import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    // add new course
    getCategories: builder.mutation({
      query: () => ({
        url: "/getcategorytree",
        method: "POST",
        body: {},
      }),
      transformResponse: (response) => response?.messageData,
    }),
  }),
});

export const { useGetCategoriesMutation } = categoriesApi;
