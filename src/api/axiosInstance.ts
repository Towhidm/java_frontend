import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

// Response Interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if the cookie is expired or missing
        console.warn("Unauthorized detected from axios instance");
    }
    return Promise.reject(error);
  }
);