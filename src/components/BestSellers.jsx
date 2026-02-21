import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BestSellingPuppies() {
  const [puppies, setPuppies] = useState([]); // state for puppies
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch('https://donda-puppies-backend.onrender.com/api/puppies/best-sellers'); // your backend endpoint
        const data = await res.json();
        setPuppies(data);
      } catch (err) {
        console.error('Error fetching best-selling puppies:', err);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="best-section">
      <div className="best-container">
        <h2 className="best-title">Best Selling Puppies</h2>
        <div className="best-seller-product-grid">
          {puppies.length > 0 ? (
            puppies.map((puppy) => (
              <div key={puppy.name} className="best-seller-product-card">
                <img
                  src={`https://donda-puppies-backend.onrender.com${puppy.images[0]}`}
                  alt={puppy.name}
                  className="best-seller-product-image"
                />
                <h3 className="best-seller-product-name">{puppy.name}</h3>
                <p className="best-seller-product-price">{puppy.price}</p>
                 <button onClick={() => navigate(`/puppyDetail/${puppy._id}`)} className="view-more">View more about Puppy</button>
              </div>
            ))
          ) : (
            <p>Loading best-selling puppies...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BestSellingPuppies;
