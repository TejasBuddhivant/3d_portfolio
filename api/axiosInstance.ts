import axios from "axios";

/**
 * Shared Axios instance for every external request made by the app.
 * Components must never import this directly — they go through
 * Redux Saga, which uses the service functions in this package.
 */
export const axiosInstance = axios.create({
  baseURL: "/zenquotes-proxy",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});
