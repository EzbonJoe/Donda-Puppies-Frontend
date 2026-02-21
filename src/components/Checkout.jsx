import '../checkout.css';
import { useCart } from '../context/cartContext';
import CartItem from '../Cart/CartItem';
import PaymentSummary from '../Cart/PaymentSummary';
import {useState, useEffect} from 'react';
import LoadingSpinner from './LoadingSpinner';
import cartApi from '../api/cartApi';
import orderApi from '../api/orderApi';
import {useNavigate} from 'react-router-dom';

export default function Checkout(){
  const { cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity,  getDeliveryOption, calculateDeliveryDate, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    region: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const user = JSON.parse(localStorage.getItem("user"));
  const userId =  user?.id;
  

  useEffect(() => {
    // Fetch the cart items for the user when the component mounts
     const fetchCartItems = async () => {
      if (!userId || !localStorage.getItem("token")) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await cartApi.getCartByUserId(userId);        
        // Assuming the response data is in the format { cartItems: [...] }
        const fetchedCartItems = response.data.cartItems;        
        setCartItems(fetchedCartItems); // Update the cart items in context        
        setLoading(false);        
      } catch (error) {
        setError('Failed to load cart items');
        setLoading(false);
        console.error("Error fetching cart items:", error);  
      }
    };

    fetchCartItems();
  }, [userId]);

  if (loading) return <LoadingSpinner />;

  if (error === 'User not authenticated') {
    return <p>Please log in to view your cart.</p>;
  }

  let totalItems = 0; 
  let productsPriceCents = 0;
  let shippingPriceCents  = 0;

  cartItems.forEach((item) => {
    totalItems += item.quantity;
    productsPriceCents += item.product.priceCents * item.quantity;
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1;

  const totalCents = totalBeforeTaxCents + taxCents;

  const handlePlaceOrder = async () => {
    if (!userId || !localStorage.getItem("token")) {
      setError('User not authenticated');
      return;
    }

    try{
      const orderData = {
        userId,
        shippingAddress,
        paymentMethod,
        items: cartItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          deliveryOptionId: item.deliveryOptionId
        })),
        totalCents
      };

      const response = await orderApi.placeOrder(orderData);
      const createdOrderId = response.data.order._id;
      setSuccessMessage('Order placed successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000)
      clearCart(); // Clear the cart after placing the order
      navigate(`/orderHistory/${createdOrderId}`); // Redirect to order detail page
    }catch (error) {
      setError('Failed to place order');
      console.error("Error placing order:", error);
      return;
    }
  }   


  return (
    <>
      <div className="checkout-header">      
        <div className="header-content">
          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link js-return-to-home-link"
            href="amazon.html">{totalItems}</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="lock"/>
          </div>
        </div>

      </div>

      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">           
              {
                cartItems.map((item) => {
                  const deliveryOption = getDeliveryOption(item.deliveryOptionId)
                  const dateString = calculateDeliveryDate(deliveryOption)
                  return(
                  <CartItem 
                    key={item._id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    updateCartItemQuantity={updateCartItemQuantity}
                    topDateString={dateString}
                  />
                  )
                })
              }           
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
              totalItems={totalItems}         
              productsPriceCents={productsPriceCents}
              shippingPriceCents={shippingPriceCents}
              totalBeforeTaxCents={totalBeforeTaxCents}
              taxCents={taxCents}
              totalCents={totalCents}
              handlePlaceOrder={handlePlaceOrder}
              successMessage={successMessage}
              error={error}              
            />
          </div>
        </div>
      </div>           
    </>
  )
}