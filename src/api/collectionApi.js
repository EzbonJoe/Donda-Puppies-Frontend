import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/collections';

const getAllCollections = () => axios.get(`${API_BASE}/`);

const getCollectionByKey = (key) => axios.get(`${API_BASE}/${key}`);

const createCollection = (collectionData) => axios.post(`${API_BASE}/`, collectionData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})

const updateCollection = (id, collectionData) => axios.patch(`${API_BASE}/${id}`, collectionData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const deleteCollection = (id) => axios.delete(`${API_BASE}/${id}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});


const collectionApi = {
  getAllCollections,
  getCollectionByKey,
  createCollection,
  updateCollection,
  deleteCollection
};

export default collectionApi;