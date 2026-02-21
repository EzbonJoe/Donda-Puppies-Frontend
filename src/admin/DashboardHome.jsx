import NotificationsPanel from './NotificationsPanel';
import SalesChart from './SalesChart';
import StatsCard from './StatsCard';
import {useState, useEffect} from 'react';
import adminPageApi from '../api/adminPageApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaDollarSign, FaShoppingCart, FaUsers, FaBox } from "react-icons/fa";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0

  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const data = await adminPageApi.getDashboardData(token);
        setStats({
          totalUsers: data.totalUsers,
          totalOrders: data.totalOrders,
          totalRevenue: data.totalEarnings,
          totalProducts: data.totalProducts
        });
        setNotifications(data.notifications?.pendingOrders || []);
        setMonthlyEarnings(data.monthlyEarnings || []);
        setMonthlyOrders(data.monthlyOrders || []);
        console.log(data.notifications.pendingOrders);        
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
return (
    <div className="dashboard-container">
      {/* Top Section - Stats */}
      <div className="dashboard-stats">
        <StatsCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={<FaDollarSign />} />
        <StatsCard title="Total Orders" value={stats.totalOrders} icon={<FaShoppingCart />} />
        <StatsCard title="Total Users" value={stats.totalUsers}  icon={<FaUsers />}/>
        <StatsCard title="Total Products" value={stats.totalProducts} icon={<FaBox />} />
      </div>

      {/* Middle Section - Sales Chart */}
      <div className="dashboard-chart">
       <SalesChart earningsData={monthlyEarnings} ordersData={monthlyOrders} />
      </div>

      {/* Right/Bottom Section - Notifications */}
      <div className="dashboard-notifications">
        <NotificationsPanel count={notifications} />
      </div>
    </div>
  );
}

export default DashboardHome;