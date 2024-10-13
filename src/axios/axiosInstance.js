import axios from "axios";

export const BASE_URL = "https://api.yasakashi.ir";

const MY_BASE_URL = "https://api.yasakashi.ir";

// "https://api.yasakashi.ir";
// axios instance
export const axiosInstance = axios.create({
  baseURL: MY_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

// axios private instannce
export const axiosPrivate = axios.create({
  baseURL: MY_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
