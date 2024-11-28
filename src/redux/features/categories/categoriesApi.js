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
    // get all categories
    getCategories: builder.mutation({
      query: () => ({
        url: "/getcategorytree",
        method: "POST",
        body: {},
      }),
      transformResponse: (response) => response?.messageData,
    }),

    getMainCategoriesByInfo: builder.mutation({
      query: ({ parentId }) => ({
        url: "/categorymangment/getcategoryinfo",
        method: "POST",
        body: {
          parentId,
        },
      }),
      transformResponse: (response) => response?.messageData,
    }),

    getSubCategoriesByInfo: builder.mutation({
      query: ({ parentId }) => ({
        url: "/categorymangment/getcategoryinfo",
        method: "POST",
        body: {
          parentId,
        },
      }),
      transformResponse: (response) => response?.messageData,
    }),
  }),
});

export const { useGetCategoriesMutation, useGetMainCategoriesByInfoMutation, useGetSubCategoriesByInfoMutation } = categoriesApi;
