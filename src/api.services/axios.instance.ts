import axios from "axios";
import apiConfig from "../configs/api.config";

const axiosInstance = axios.create({ baseURL: apiConfig.serverUrl });

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("jwtToken"); // Replace with your storage mechanism
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response.status === 401 || response.status === 403) {
      window.location.href = "/";
      localStorage.removeItem("jwtToken");
    }
    return response;
  },
  (error: any) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      window.location.href = "/";
      localStorage.removeItem("jwtToken");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
