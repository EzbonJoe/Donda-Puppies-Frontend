import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/user", // adjust if hosted
});

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // assuming you store JWT in localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Fetch user dashboard data
const fetchUserDashboard = async (page = 1, limit = 3) => {
  const { data } = await API.get(`/dashboard?page=${page}&limit=${limit}`);

  if (data.success) {
    return data.data; // ✅ unwrap and return only the payload
  }

  throw new Error(data.message || "Failed to fetch dashboard data");
};

const userPageApi = {
  fetchUserDashboard,
};

export default userPageApi;