import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react'; // you can replace icons if you like

const MobileNav = () => {
  return (
    <nav className="mobile-nav">
      <NavLink to="/userDashboard" className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/userDashboard/orderHistory" className="nav-item">
        <ShoppingBag size={20} />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/userDashboard/wishList" className="nav-item">
        <Heart size={20} />
        <span>Wishlist</span>
      </NavLink>
      <NavLink to="/userDashboard/accountSettings" className="nav-item">
        <User size={20} />
        <span>Account</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
