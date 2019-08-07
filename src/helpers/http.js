import axios from "axios";
import { appConfig } from "./config";

export const http = axios.create({
  baseURL: appConfig.apiEndpoint,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  function(config) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      config.headers["x-auth-token"] = user.token;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);
