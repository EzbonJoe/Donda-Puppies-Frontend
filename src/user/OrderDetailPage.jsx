import {formatCurrency} from "../utils/money.js";
import { useState, useEffect } from 'react';
import orderApi from '../api/orderApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.data);  
        console.log(response.data);            
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if(loading) return <LoadingSpinner />;
  if(error) return <p className="error-message">{error}</p>;

  return (
    <div className="order-details-container">
      <Link to="/userDashboard/orderHistory" className="back-link">&larr; Back to Orders</Link>
      <h2>Order Details</h2>
      <div className="order-meta">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
        <p><strong>Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
        <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount * 100)}</p>
      </div>

      <h3>Shipping Address</h3>
      <div className="address-box">
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.phone}</p>
        <p>{order.shippingAddress.addressLine}</p>
        <p>{order.shippingAddress.city}, {order.shippingAddress.region}</p>
      </div>

      <h3>Items</h3>
      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={item._id}>
            <img
              src={`http://localhost:5000${item.product.images[0]}`}
              alt={item.product.name}
              className="order-item-image"
            />
            <div>
              <p className="product-name">{item.product.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: {formatCurrency(item.product.priceCents)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetailPage;



