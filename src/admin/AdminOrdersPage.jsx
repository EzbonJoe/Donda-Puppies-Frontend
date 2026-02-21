import {useState, useEffect} from "react";
import orderApi from "../api/orderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getAllOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.includes(search) ||
      order.user?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? order.status?.toLowerCase() === statusFilter.toLowerCase() : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-orders-page">
      <h2>Admin Order Management</h2>

      <div className="order-filters">
        <input
          type="text"
          placeholder="Search by Order ID or User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Placed On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.email || 'N/A'}</td>
                  <td>{order.status}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentMethod || 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/order/${order._id}`}>
                      <button>View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div><strong>Order:</strong> {order._id.slice(-8)}</div>
                <div><strong>User:</strong> {order.user?.email || "N/A"}</div>
                <div><strong>Status:</strong> 
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</div>
                <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                <Link to={`/admin/order/${order._id}`}><button>View</button></Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrdersPage;
