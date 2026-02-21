import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import LoadingSpinner from './LoadingSpinner';


export default function FeaturedCollections() {  
  const { collections, loading } = useCart();
  
  if (loading) return <LoadingSpinner />;
  return(
    <section className="featured-collections-section">   
      <h2 className="">Browse Our Puppy Collections</h2>
      <div className="collections-container">
       {collections.map((collection) => {
        return (
          <div className="collections-element" key={collection.key}>                     
            <img src={`https://donda-puppies-backend.onrender.com${collection.backgroundImage}`} alt="dog" className="collection-image" />
            <h3 className="text-xl font-semibold mb-2"> {collection.name} </h3>
            <p className="text-gray-600">{collection.description}</p>
            <Link to={`/collections/${collection.key}`}>See more</Link>
          </div>
        )
       })}
      </div> 
    </section>
  )
}