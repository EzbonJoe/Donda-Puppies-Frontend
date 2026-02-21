import axios from 'axios';
const API_BASE = 'https://donda-puppies-backend.onrender.com/api/users';

//Admin end points
const getAllUsers = () => axios.get(`${API_BASE}/`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});
const getUserById = (id) => axios.get(`${API_BASE}/${id}`);
const updateUser = (id, userData) => axios.patch(`${API_BASE}/${id}`, userData, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});
const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
}); 

// 🔹 User Self-Service Endpoints
const getProfile = () => axios.get(`${API_BASE}/profile`,{
  headers:{
    'Authorization' : `Bearer ${localStorage.getItem("token")}`
  }
});
const updateProfile = (userData) =>  axios.patch(`${API_BASE}/profile`, userData, {
  headers:{
    'Authorization' : `Bearer ${localStorage.getItem("token")}`
  }
});

const changePassword = (passwordData) =>  axios.patch(`${API_BASE}/change-password`, passwordData, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const userApi = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword
};

export default userApi;