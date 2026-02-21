import { useState, useEffect } from 'react';
import orderApi from '../api/orderApi';
import { formatCurrency } from "../utils/money.js";
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getMyOrders();

        //check if there are no orders
        if (response.data.length === 0) {
          setOrders([]);
          return;
        }
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders'); 
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if(loading) return <LoadingSpinner />;
  if(error) return <p className="error-message">{error}</p>;
 return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <Link key={order._id} to={`/orderHistory/${order._id}`} className="order-card">
              {/* Header */}
              <div className="order-header">
                <div>
                  <span className="label">ORDER PLACED</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="label">TOTAL</span>
                  <span>{formatCurrency(order.totalAmount * 100)}</span>
                </div>
                <div>
                  <span className="label">STATUS</span>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item._id}>
                    <img
                      className="order-item-image"
                      src={`https://donda-puppies-backend.onrender.com${item.product.images[0]}${item.product.images[0]}`}
                      alt={item.product.name}
                    />
                    <div className="order-item-details">
                      <p className="product-name">{item.product.name}</p>
                      <p className="quantity">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="order-footer">
                <span className="order-id">Order ID: {order._id}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;