import orderApi from "../api/orderApi";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link, useParams } from "react-router-dom";

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await orderApi.getOrderById(id);
      setOrder(res.data);
      setStatus(res.data.status);
    } catch (err) {
      setError("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      await orderApi.updateOrderStatus(id, status);
      alert("Order status updated successfully");
      fetchOrder();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="order-detail-container">
      <div className="order-header">
        <h2>Order Details</h2>
        <Link to="/adminDashboard/orders" className="back-link">← Back to Orders</Link>
      </div>

      <div className="order-info-card">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
        <p><strong>Status:</strong> <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></p>
        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>

        <div className="status-update">
          <label htmlFor="status">Change Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button onClick={handleStatusUpdate}>Update</button>
        </div>
      </div>

      <h3>Items</h3>
      <ul className="order-items-list">
        {order.items.map((item, index) => (
          <li key={index} className="order-item">
            <img
              src={`https://donda-puppies-backend.onrender.com${item.product.images[0]}`}
              alt={item.product.name}
              className="order-item-image"
            />
            <div className="order-item-details">
              <p className="order-item-name">{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              {item.product.price && (
                <p>Price: ${item.product.price.toFixed(2)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderDetailPage;
