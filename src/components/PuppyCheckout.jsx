import '../checkout.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import puppyApi from '../api/puppiesApi';
import orderApi from '../api/orderApi';
import PaymentSummary from '../Cart/PaymentSummary';

export default function PuppyCheckout() {

  const { puppyId } = useParams();
  const navigate = useNavigate();

  const [puppy, setPuppy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    region: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchPuppy = async () => {
      try {
        const response = await puppyApi.getPuppyById(puppyId);
        setPuppy(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load puppy");
        setLoading(false);
      }
    };

    fetchPuppy();
  }, [puppyId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (!puppy) return <p>Puppy not found</p>;

  const totalCents = puppy.priceCents;

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId,
        shippingAddress,
        paymentMethod,
        puppyId: puppy._id,
        totalCents
      };

      const response = await orderApi.placePuppyOrder(orderData);
      const createdOrderId = response.data.order._id;

      navigate(`/orderHistory/${createdOrderId}`);
    } catch (error) {
      setError("Failed to place puppy order");
    }
  };

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-middle-section">
            Puppy Checkout
          </div>
        </div>
      </div>

      <div className="main">
        <div className="page-title">Review Your Puppy</div>

        <div className="checkout-grid">

          <div className="order-summary">
            <div className="cart-item-container">
              <img src={puppy.images[0]} alt={puppy.name} />
              <div>
                <h3>{puppy.name}</h3>
                <p>Breed: {puppy.breed}</p>
                <p>Gender: {puppy.gender}</p>
                <p>Age: {puppy.ageInWeeks} weeks</p>
                <p><strong>${(puppy.priceCents / 100).toFixed(2)}</strong></p>
              </div>
            </div>
          </div>

          <div className="shipping-info-form">
            <h3>Shipping Address</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={shippingAddress.fullName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, fullName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address Line"
              value={shippingAddress.addressLine}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, addressLine: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Region"
              value={shippingAddress.region}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, region: e.target.value })
              }
            />

            <h3>Payment Method</h3>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Cash on Delivery</option>
              <option>Mobile Money</option>
              <option>Credit Card</option>
            </select>
          </div>

          <div className="payment-summary">
            <PaymentSummary
              totalItems={1}
              productsPriceCents={puppy.priceCents}
              shippingPriceCents={0}
              totalBeforeTaxCents={puppy.priceCents}
              taxCents={0}
              totalCents={puppy.priceCents}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>

        </div>
      </div>
    </>
  );
}