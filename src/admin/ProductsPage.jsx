import { useCart } from '../context/cartContext';
import { formatCurrency } from '../utils/money';
import { useState } from 'react';
import productApi from '../api/productApi';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsPage = () => {
  const { products, setProducts, loading } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',      
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('price', Math.round(parseFloat(form.price) * 100));
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await productApi.createProduct(formData);
      setForm({
        name: '',
        description: '',
        category: '',
        price: ''
      });

      setSuccessMessage('Product added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 6000);

      setImageFiles([]);
      setShowModal(false);
      // Refresh the product list after adding a new product      
      const response = await productApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product. Please try again.');
      alert('Failed to add product. Please try again.');
    }
  }

  const handleEditProduct = async (e) => {
    e.preventDefault();    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('price', Math.round(parseFloat(form.price) * 100));
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });
    try {
      await productApi.updateProduct(editingProductId, formData);
      const response = await productApi.getAllProducts();
      setProducts(response.data);
      setForm({
        name: '',
        description: '',
        category: '',
        price: ''
      });
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 6000); 

      setForm({
        name: '', 
        description: '',
        category: '',
        price: ''
      });
      setImageFiles([]);
      setShowModal(false);
      setIsEditMode(false);
      setEditingProductId(null);
      
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Failed to update product. Please try again.');
      alert('Failed to update product. Please try again.');
    }
  } 

  const handleEditClick = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    });
    setImageFiles([]);
    setEditingProductId(product._id);
    setIsEditMode(true);
    setShowModal(true);
  }

  const handleDelete = async(productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await productApi.deleteProduct(productId);
      // Remove the deleted product from local state
      const updatedList = products.filter(product => product._id !== productId);
      setProducts(updatedList);
      setSuccessMessage("Product deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage("Failed to delete product. Please try again.");
    }
  }

  if (loading) return <LoadingSpinner />;
  return(
     <div className="product-listing">
        <h1>Products</h1> 
        <button onClick={() => setShowModal(true)} className="add-product-button">Add Product</button>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={isEditMode ? handleEditProduct : handleAddProduct} encType="multipart/form-data" className="add-product-form">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <textarea
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />

                <div className="modal-actions">
                  <button type="submit" className="add-btn">{isEditMode ? "Save Changes" : "Add Product"}</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="product-listing-product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-listing-product-card">
              <img src={`${product.images[0]}`} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{formatCurrency(product.price)}</p>             
              <button className='edit-btn' onClick={() => handleEditClick(product)}>
                Edit
              </button>
              <button className='delete-btn' onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          ))} 
        </div>
      </div>
  )
}

export default ProductsPage;