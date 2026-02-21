import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => { 
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2>User Dashboard</h2>
      <ul>
        <li>
          <Link className="sidebar-link" to="/userDashboard" >Home</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/userDashboard/accountSettings">Account settings</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/userDashboard/orderHistory">Order History</Link>
        </li>
        <li>
          <Link className="sidebar-link" to="/userDashboard/wishList">Wish List</Link>
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