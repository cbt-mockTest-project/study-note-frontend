import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("API URL MISSING");
}

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

if (!baseURL) {
  throw new Error("BASE_URL IS MISSING");
}

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
