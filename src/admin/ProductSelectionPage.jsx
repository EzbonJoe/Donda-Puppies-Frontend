import { useCart } from "../context/cartContext";
import { useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';


const ProductSelectionPage = () => {
  const { products, selectedProducts, setSelectedProducts, formData, setFormData, setShowModal, puppies } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/adminDashboard/collections'; 

  useEffect(() => {
    setSelectedProducts(formData.products || []);
  }, [formData.products]);
  
  useEffect(() => {
    setSelectedProducts(formData.products || []);
  }, [formData.products]);

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }
  const handleDone = () => {
    // Save selected products to global formData
    setFormData(prev => ({
      ...prev,
      products: selectedProducts
    }));

    // Show the modal again when back on CollectionPage
     setShowModal(true);

    // Go back
    navigate(-1);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Select Products</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {products.map(product => (
          <div
            key={product._id}
            onClick={() => toggleProduct(product._id)}
            style={{
              border: selectedProducts.includes(product._id) ? '2px solid blue' : '1px solid #ccc',
              padding: '1rem',
              cursor: 'pointer',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <img
              src={`http://localhost:5000${product.images[0]}`}
              alt={product.name}
              style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
            />
            <p>{product.name}</p>
            <input
              type="checkbox"
              readOnly
              checked={selectedProducts.includes(product._id)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleDone}>Done</button>
      </div>
    </div>
  );
}

export default ProductSelectionPage;
  