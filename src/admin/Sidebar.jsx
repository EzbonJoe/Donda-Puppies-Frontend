import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => { 
  const navigate = useNavigate();
  return (
    <div className="sidebar" style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Admin Dashboard</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/adminDashboard" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        </li>
        <li>
          <Link to="/adminDashboard/products" style={{ textDecoration: 'none', color: '#333' }} >Products</Link>
        </li>

        <li>
          <Link to="/adminDashboard/puppies" style={{ textDecoration: 'none', color: '#333' }} >Puppies</Link>
        </li>

        <li>
          <Link to="/adminDashboard/orders" style={{ textDecoration: 'none', color: '#333' }}>Orders</Link>
        </li>
        <li>
          <Link to="/adminDashboard/collections" style={{ textDecoration: 'none', color: '#333' }}>Collections</Link>
        </li>
        <li>
          <Link to="/adminDashboard/users" style={{ textDecoration: 'none', color: '#333' }}>UsersPage</Link>
        </li>
        <li>
          <span
            className="sidebar-link"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </span>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;