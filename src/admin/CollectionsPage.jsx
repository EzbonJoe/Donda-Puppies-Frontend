import { useCart } from "../context/cartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import collectionApi from '../api/collectionApi';

const CollectionPage = () => {
  const { collections, setCollections, loading, selectedProducts, isEditing, setIsEditing, editingCollectionId, setEditingCollectionId, showModal, setShowModal, formData, setFormData, setSelectedProducts } = useCart();  
  const [successMessage, setSuccesMessage] = useState('');
  const navigate = useNavigate();
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, backgroundImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.backgroundImage) {
      data.append("backgroundImage", formData.backgroundImage);
    }
    data.append("products", JSON.stringify(selectedProducts)); // Send products as JSON string

    try {
      if (isEditing) {
        const response = await collectionApi.updateCollection(editingCollectionId, data);
        setCollections(collections.map(c => c._id === editingCollectionId ? response.data : c));
        setSuccesMessage('Collection updated successfully!');
      } else {
        const response = await collectionApi.createCollection(data);
        setCollections([...collections, response.data]);
        setSuccesMessage('Collection created successfully!');
      }
     
      setFormData({ name: '', description: '', backgroundImage: null, products: [] });
      setShowModal(false);
      setIsEditing(false);
      setEditingCollectionId(null);      
      setTimeout(() => {
        setSuccesMessage('');
      }, 6000);
    } catch (err) {
      console.error(isEditing ? "Failed to update collection:" : "Failed to create collection:", err);
    }
  };

  const handleEditClick = (collection) => {
    setIsEditing(true);
    setEditingCollectionId(collection._id);
    setFormData({
      name: collection?.name || '',
      description: collection?.description || '',
      backgroundImage: null, // You can optionally prefill if desired
      products: collection?.products?.map(p => typeof p === 'object' ? p._id : p) || [],
    });
    setShowModal(true);
    setSelectedProducts(collection?.products?.map(p => typeof p === 'object' ? p._id : p) || []);
  };

  const handleDeleteClick = async (collectionId, collectionName) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete the collection "${collectionName}"?`);
      if (!confirmed) return;
      await collectionApi.deleteCollection(collectionId);
      setCollections(collections.filter(c => c._id !== collectionId));
      setSuccesMessage('Collection deleted successfully!');
      setTimeout(() => {
        setSuccesMessage('');
      }, 6000);
    } catch (err) {
      console.error("Failed to delete collection:", err); 
      alert('Failed to delete collection. Please try again.');
    }
  }
   
    return (
      <div className="product-listing">
        <h2>Collections</h2>
        <button className="add-product-button" 
          onClick={() => { 
            setShowModal(true)
            setIsEditing(false);
            setEditingCollectionId(null);
            setFormData({ name: '', description: '', backgroundImage: null, products: [] });
            setSelectedProducts([]);            
          }}
          
        >
          Add Collection
        </button>

        {successMessage && <div className="success-message">{successMessage}</div>}

         {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>{isEditing ? 'Edit Collection' : 'Create Collection'}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-product-form">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />                 

                  <label>Description:</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required />

                  <label>Background Image:</label>
                  <input type="file" name="backgroundImage" accept="image/*" onChange={handleFileChange} />

                  {selectedProducts.length > 0 && (
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>
                      {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} currently selected for this collection.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate('/select-products', {
                      state: {
                        fromModal: true,
                        mode: isEditing ? 'edit' : 'create',
                        formData,
                        editingCollectionId: isEditing ? editingCollectionId : null
                      }
                    })}
                  >
                    {selectedProducts.length > 0
                      ? `Edit Selected Products (${selectedProducts.length})`
                      : 'Select Products'
                    }
                  </button>                

                  <div className="modal-buttons">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowModal(false);
                        setIsEditing(false);
                        setEditingCollectionId(null);
                        setFormData({ name: '', description: '', backgroundImage: null, products: [] });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          {loading ? <LoadingSpinner /> : (
            <div className="product-listing-product-grid"> 
              {collections.map((collection) => (
                <div key={collection._id} className="product-listing-product-card">
                  <img src={`https://donda-puppies-backend.onrender.com${collection.backgroundImage}`} alt={collection.name} />
                  <h2>{collection.name}</h2>
                  <p>{collection.description}</p>
                  <Link to={`/collections/${collection.key}`} className="view-link">View collection</Link>
                  <button className="edit-btn" onClick={() => handleEditClick(collection)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(collection._id, collection.name)}>Delete</button>
                </div>
              ))}
            </div>
          )}
      </div>
    );
}

export default CollectionPage; 