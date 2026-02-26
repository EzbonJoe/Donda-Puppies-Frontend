import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cartContext.jsx";
import { formatCurrency } from "../utils/money";
import LoadingSpinner from './LoadingSpinner';
import WishlistButton from './WishlistButton';

const PuppiesListingPage = () => {
  const navigate = useNavigate(); 
  const { puppies, loading } = useCart(); 

  if (loading) return <LoadingSpinner />;  

  return (
    <div className="product-listing">
      <h1>Puppies</h1>
      <div className="product-listing-product-grid">
        {puppies.map((puppy) => (
          <div key={puppy._id} className="product-listing-product-card">
            <img src={`${puppy.images[0]}`} alt={puppy.name} /> 
            <h2>{puppy.name}</h2>
            <p>Breed:{puppy.breed}</p>
            <p>Age in weeks: {puppy.ageInWeeks}</p>
            <p>Gender: {puppy.gender}</p>
            <p>Value: {formatCurrency(puppy.priceCents)}</p>
            {addedMessages[puppy._id] && (
              <div className={`added-to-cart ${addedMessages[puppy._id] ? 'show-message' : ''}`}>
                <img src="/images/icons/checkmark.png" alt="Check" />
                Added
              </div>
            )} 
            <button className="add-to-cart" onClick={() => addToCart(puppy, "puppy")}>Add to Cart</button>
            <button onClick={() => navigate(`/puppyDetail/${puppy._id}`)} className="view-more">View more about Puppy</button>
            
            <WishlistButton productId={puppy._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuppiesListingPage;
