import axios from "axios";
import store from "../redux/store";
import { show_message, toggle_loading, toggle_loading_level_2 } from "../redux/features/generalSlice";
import { BASE_URL } from "./axiosInstance";

export const http_instanse = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
http_instanse.interceptors.request.use((config) => {
  store.dispatch(toggle_loading(true));

  if (localStorage.loginToken) {
    config.headers["Authorization"] = `Bearer ${localStorage.loginToken}`;
  }

  return config;
});
http_instanse.interceptors.response.use(
  (config) => {
    store.dispatch(toggle_loading(false));

    return config;
  },
  (err) => {
    store.dispatch(toggle_loading(false));
    if (err?.config?.responseType !== "blob") {
      store.dispatch(
        show_message({
          mode: true,
          color: "error",
          message: err?.response?.data?.title || "",
        })
      );
    }
    if (err?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
  }
);
export const http_instanse_level_2 = axios.create({
  baseURL: "https://api.yasakashi.ir",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
http_instanse_level_2.interceptors.request.use((config) => {
  store.dispatch(toggle_loading_level_2(true));

  if (localStorage.loginToken) {
    config.headers["Authorization"] = `Bearer ${localStorage.loginToken}`;
  }

  return config;
});
http_instanse_level_2.interceptors.response.use(
  (config) => {
    store.dispatch(toggle_loading_level_2(false));

    return config;
  },
  (err) => {
    store.dispatch(toggle_loading_level_2(false));
    if (err?.config?.responseType !== "blob") {
      store.dispatch(
        show_message({
          mode: true,
          color: "error",
          message: err?.response?.data?.title || "",
        })
      );
    }

    if (err?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
  }
);
