import axios from 'axios';
const API_BASE = 'http://localhost:5000/api/orders';

const placeOrder = (orderData) => axios.post(`${API_BASE}/place`, orderData, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const getMyOrders = () => axios.get(`${API_BASE}/my-orders`,{
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
})

const getOrderById = (id) => axios.get(`${API_BASE}/${id}`, {
  headers:{
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
})

const getAllOrders = () => axios.get(`${API_BASE}/admin`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const updateOrderStatus = async (id, status) => axios.patch(`${API_BASE}/${id}/status`, { status }, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
});



const orderApi = {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};

export default orderApi;