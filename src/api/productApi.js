import axios from 'axios';

const API_BASE = 'https://donda-puppies-backend.onrender.com/api/products';

const getAllProducts =  () => axios.get(`${API_BASE}/`);

const getProductById = (productId) => axios.get(`${API_BASE}/${productId}`);

const createProduct = (data) => axios.post(`${API_BASE}/`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const updateProduct = (productId, data) => axios.patch(`${API_BASE}/${productId}`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const deleteProduct = (productId) => axios.delete(`${API_BASE}/${productId}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});


const productApi = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

export default productApi;