import { api } from "./axiosInstance";

// Register a new user
export const registerUser = (userData: any) => api.post("/auth/register", userData);

// Login and receive the cookie automatically
export const loginUser = (credentials: any) => api.post("/auth/login", credentials);

// Logout and clear the cookie
export const logoutUser = () => api.post("/auth/logout");