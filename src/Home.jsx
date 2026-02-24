import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import ValueProps from './components/ValueProps';
import BestSellers from './components/BestSellers';
import CustomerReviews from './components/CustomerReviews';
import StoreInfo from './components/StoreInfo';


export default function Home() {
  return(
    <div className="Home">
      <HeroSection/>
      <FeaturedCollections/>   
      <ValueProps/>   
      <BestSellers/>
      {/* <CustomerReviews/> */}
      <StoreInfo/>
    </div>
  )
}
