import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";

export const adminTicketsApi = createApi({
  reducerPath: "adminTicketsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTicketsReports: builder.query({
      query: () => ({
        url: "/adminpanel/support/getalltickets",
        method: "POST",
        body: {},
      }),
    }),
    responseToTicket: builder.mutation({
      query: ({ data }) => ({
        url: "/ticket/answerticket",
        method: "POST",
        body: data,
      }),
    }),

    responseToTicketFile: builder.mutation({
      query: ({ data }) => ({
        url: "/ticket/uploadticketfile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTicketsReportsQuery,
  useResponseToTicketMutation,
  useResponseToTicketFileMutation,
} = adminTicketsApi;
