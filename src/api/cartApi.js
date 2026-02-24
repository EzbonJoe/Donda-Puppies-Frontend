import axios from 'axios';

const API_BASE = 'https://donda-puppies-backend.onrender.com/api/cart';

const authHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const getCartByUserId = (userId) => axios.get(`${API_BASE}/${userId}`, authHeader());

const createNewCart = () => axios.post(`${API_BASE}/`, {}, authHeader());

const addItemToCart = (data) => axios.post(`${API_BASE}/add-item`, data, authHeader());

const updateCartItem = (data) =>  axios.patch(`${API_BASE}/update-item`, data, authHeader()); 

const deleteCartItem = (data) => axios.delete(`${API_BASE}/remove-item`, {
    ...authHeader(),
    data
  });

const clearCart = (userId) => axios.delete(`${API_BASE}/clear/${userId}`, authHeader());

const updateDeliveryOptionId = (data) => axios.patch(`${API_BASE}/update-delivery-option`, data, authHeader());

const cartApi = {
  getCartByUserId,
  createNewCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  updateDeliveryOptionId
};

export default cartApi;