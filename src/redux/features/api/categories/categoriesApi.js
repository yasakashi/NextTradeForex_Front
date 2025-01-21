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
    // add new category
    addNewCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categorymangment/addcategory",
        method: "POST",
        body: data,
      }),
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categorymangment/editcategory",
        method: "POST",
        body: data,
      }),
    }),

    // get all categories
    getCategories: builder.mutation({
      query: () => ({
        url: "/getcategorytree",
        method: "POST",
        body: {
          parentId: 770,
        },
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

    getCategoryInfo: builder.mutation({
      query: ({ data }) => ({
        url: "/categorymangment/getcategoryinfo",
        method: "POST",
        body: data,
      }),
    }),

    removeCategory: builder.mutation({
      query: ({ data }) => ({
        // data: category Id
        url: "/categorymangment/deletecategory",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCategoriesMutation,
  useGetMainCategoriesByInfoMutation,
  useGetSubCategoriesByInfoMutation,
  useAddNewCategoryMutation,
  useGetCategoryInfoMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation
} = categoriesApi;
