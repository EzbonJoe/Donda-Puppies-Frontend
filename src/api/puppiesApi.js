import axios from 'axios';

const API_BASE = 'https://donda-puppies-backend.onrender.com/api/puppies';

const getPuppies =  () => axios.get(`${API_BASE}/`);

const getPuppyById = (puppyId) => axios.get(`${API_BASE}/${puppyId}`);

const createPuppy = (data) => axios.post(`${API_BASE}/`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const updatePuppy = (puppyId, data) => axios.patch(`${API_BASE}/${puppyId}`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});

const deletePuppy = (puppyId) => axios.delete(`${API_BASE}/${puppyId}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
});


const puppyApi = {
  getPuppies,
  getPuppyById,
  createPuppy,
  updatePuppy,
  deletePuppy
};

export default puppyApi;