import { useState, useEffect } from "react";
import userPageApi from "../api/userPageApi";
import LoadingSpinner from "../components/LoadingSpinner";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = await userPageApi.fetchUserDashboard(1, 3);
        setDashboardData(payload); // ✅ now payload = { user, quickStats, recentOrders }        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData(null);       
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!dashboardData) return <p>No dashboard data.</p>;

  const { user, quickStats, recentOrders } = dashboardData; 

  return (
    <div className="dashboard-home">
      {/* Welcome Section */}
      <div className="welcome-card">
        <h2>Welcome back, {user.name} 👋</h2>
        <p>Here’s a quick look at your account activity.</p>
      </div>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="stat-box orders">
          <div className="stat-icon">📦</div>
          <h3>Orders</h3>
          <p>{quickStats.ordersCount}</p>
        </div>
        <div className="stat-box wishlist">
          <div className="stat-icon">❤️</div>
          <h3>Wishlist</h3>
          <p>{quickStats.wishlistCount}</p>
        </div>
        <div className="stat-box cart">
          <div className="stat-icon">🛒</div>
          <h3>Cart</h3>
          <p>{quickStats.cartCount}</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          {recentOrders.list.length > 0 ? (
            recentOrders.list.map((order) => (
              <li key={order._id}>
                <span>Order #{order._id}</span>
                <span className={`status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span>${order.totalAmount}</span>
              </li>
            ))
          ) : (
            <li>No recent orders found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;