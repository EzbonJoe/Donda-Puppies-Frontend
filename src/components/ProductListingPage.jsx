import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext.jsx";
import { formatCurrency } from "../utils/money";
import LoadingSpinner from './LoadingSpinner';
import WishlistButton from './WishlistButton';

const ProductListingPage = () => {
  const navigate = useNavigate(); 
  const { products, loading, addToCart, addedMessages } = useCart(); 

  if (loading) return <LoadingSpinner />;  

  return (
    <div className="product-listing">
      <h1>products</h1>
      <div className="product-listing-product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-listing-product-card">
            <img src={`http://localhost:5000${product.images[0]}`} alt={product.name} /> 
            <h2>{product.name}</h2>
            <p>Description:{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: {formatCurrency(product.priceCents)}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => navigate(`/productDetail/${product._id}`)} className="view-more">View more about product</button>
            {addedMessages[product._id] && (
              <div className={`added-to-cart ${addedMessages[product._id] ? 'show-message' : ''}`}>
                <img src="/images/icons/checkmark.png" alt="Check" />
                Added
              </div>
            )} 
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            
            <WishlistButton productId={product._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
