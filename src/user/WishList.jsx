import wishlistApi from '../api/wishlistApi';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useCart} from '../context/cartContext';

const WishList = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchWishlist = async () => {
    try {
      const res = await wishlistApi.getWishlist();
      setWishlist(res.data);
    } catch (err) {
      setError('Failed to fetch wishlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistApi.removeFromWishlist(productId);
      setWishlist({
        ...wishlist,
        products: wishlist.products.filter((item) => item._id !== productId),
      });
      toast.success('Item removed from wishlist');
    } catch (err) {
      console.error('Failed to remove item from wishlist:', err);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const handleMoveToCart = async (product) => {
    try {
      await addToCart(product);  // ✅ Add to cart
      await handleRemoveFromWishlist(product._id); // ✅ Remove from wishlist
      toast.success(`${product.name} moved to cart`);
    } catch (err) {
      console.error('Failed to move item to cart:', err);
      toast.error('Failed to move item to cart');
    }
  };

  const handleAddToCart = (productId) => {
    toast.success('Added to cart (demo)');
    // Here you’d call your cart API
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      {(!wishlist || wishlist.products.length === 0) ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.products.map((product) => (
            <div key={product._id} className="wishlist-card">              

              <div className="image-wrapper">
                <Link to={`/productDetail/${product._id}`}>
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                  />
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();   // Prevent the click from reaching the Link
                    handleRemoveFromWishlist(product._id);                    
                  }}
                  className="wishlist-remove-btn"
                >
                  ✕
                </button>

                <div className="overlay">
                  <button
                    onClick={() =>handleMoveToCart(product)}
                    className="add-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="wishlist-info">
                <Link to={`/productDetail/${product._id}`} className="wishlist-name">
                  {product.name}
                </Link>
                <p className="wishlist-price">
                  ${(product.priceCents / 100).toFixed(2)}
                </p>                
              </div>
            </div>
          ))}
        </div>
      )}      
    </div>
  );
};

export default WishList;