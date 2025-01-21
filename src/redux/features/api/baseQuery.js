import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("loginToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  console.log("Reauth ====>", { result });

  if (result?.error?.status == 401) {
    // api.dispatch(showAuthModal());
    // api.dispatch(logoutAction());
    // setTimeout(() => {
    //   window.location.href = "/login";
    // }, 1000);
  }

  return result;
};
