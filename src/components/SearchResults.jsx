import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { formatCurrency } from "../utils/money";
import LoadingSpinner from './LoadingSpinner';
import WishlistButton from './WishlistButton';

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); 
  const { addToCart, addedMessages } = useCart(); 

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://furniture-backend-msfk.onrender.com/api/search?query=${query}`); 
        setProducts(res.data.products);
        setLoading(false);
        console.log("Search results:", res.data.products);
      } catch (err) {
        console.error("Error fetching search results:", err); 
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <LoadingSpinner />;
  if (products.length === 0) return <p className="no-results">No products found for "{query}"</p>;

  return (
    <div className="search-results">
      <h2 className="search-title">Search results for "{query}"</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img 
                src={product.images?.length > 0 
                  ? `https://furniture-backend-msfk.onrender.com${product.images[0]}` 
                  : "/images/placeholder.jpg"} 
                alt={product.name} 
              />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{formatCurrency(product.priceCents)}</p>

            <div className="product-actions">
              <button 
                onClick={() => navigate(`/productDetail/${product._id}`)} 
                className="btn view-btn"
              >
                View Details
              </button>
              {addedMessages[product._id] && (
                <div className="added-to-cart show-message">
                  <img src="/images/icons/checkmark.png" alt="Check" />
                  Added
                </div>
              )}
              <button 
                className="btn cart-btn" 
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>            
            
              <WishlistButton productId={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}