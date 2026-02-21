import axios from "axios";

const API_BASE = "https://donda-puppies-backend.onrender.com/api/wishlist";

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

const getWishlist = () => apiClient.get("/");
const addToWishlist = (productId) => apiClient.post("/add", { productId });
const removeFromWishlist = (productId) => apiClient.delete(`/${productId}`);

const wishlistApi = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default wishlistApi;