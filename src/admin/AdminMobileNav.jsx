import { NavLink } from "react-router-dom";
import { Home, ShoppingBag,Package, FolderKanban, Users, User, Dog } from 'lucide-react'; 

const AdminMobileNav = () => { 
  return (
    <nav className="mobile-nav">
      <NavLink to="/adminDashboard" className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/adminDashboard/products" className="nav-item">
        <Package size={20} />
        <span>Products</span>
      </NavLink>
      <NavLink to="/adminDashboard/puppies" className="nav-item">
        <Dog size={20} />
        <span>Puppies</span>
      </NavLink>
      <NavLink to="/adminDashboard/orders" className="nav-item">
        <ShoppingBag size={20} />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/adminDashboard/collections" className="nav-item">
        <FolderKanban size={20} />
        <span>collections</span>
      </NavLink>
      <NavLink to="/adminDashboard/users" className="nav-item">
        <Users size={20} />
        <span>users</span>
      </NavLink>
      <NavLink to="/adminDashboard/accountSettings" className="nav-item">
        <User size={20} />
        <span>Account</span>
      </NavLink>
    </nav>
    
  );
}

export default AdminMobileNav;