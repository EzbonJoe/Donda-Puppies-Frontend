import axios from "axios";

const API_BASE = "http://localhost:5000/api/auth";

const apiClient = axios.create({
  baseURL: API_BASE,
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const login = (data) => apiClient.post("/login", data);
const signup = (data) => apiClient.post("/register", data);

const authApi = {
  login,  
  signup
};

export default authApi;