import { formatCurrency } from "../utils/money";

export default function PaymentSummary({
  cartItems,
  handlePlaceOrder,
  successMessage,
  error,
}) {
  // Calculate totals dynamically
  let totalItems = 0;
  let productsPrice = 0;
  let puppiesPrice = 0;
  let servicesPrice = 0;
  let shippingPrice = 0;

  cartItems.forEach((item) => {
    totalItems += item.quantity;

    if (item.product) {
      productsPrice += item.product.price * item.quantity;
      // Shipping option for products
      shippingPrice += item.deliveryOption?.price || 0;
    }

    if (item.puppy) {
      puppiesPrice += item.puppy.price * item.quantity;
      // Shipping option for puppies
      shippingPrice += item.deliveryOption?.price || 0;
    }

    if (item.service) {
      servicesPrice += item.service.price * item.quantity || 0;
    }
  });

  const totalBeforeTax =
    productsPrice + puppiesPrice + servicesPrice + shippingPrice;

  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Products ({totalItems}):</div>
        <div className="payment-summary-money">
          {formatCurrency(productsPrice)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Puppies:</div>
        <div className="payment-summary-money">{formatCurrency(puppiesPrice)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Services:</div>
        <div className="payment-summary-money">{formatCurrency(servicesPrice)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">{formatCurrency(shippingPrice)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">{formatCurrency(totalBeforeTax)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatCurrency(tax)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">{formatCurrency(total)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
        Place your order
      </button>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

// export default function PaymentSummary({productsPrice, shippingPrice, totalBeforeTax, tax,  total, totalItems, handlePlaceOrder, successMessage, error}) {
//   return(
//     <>
//       <div className="payment-summary-title">
//         Order Summary
//       </div>

//       <div className="payment-summary-row">
//         <div>Items ({totalItems}):</div>
//         <div className="payment-summary-money">{formatCurrency(productsPrice)}</div>
//       </div>

//       <div className="payment-summary-row">
//         <div>Shipping &amp; handling:</div>
//         <div className="payment-summary-money">{formatCurrency(shippingPrice)}</div>
//       </div>

//       <div className="payment-summary-row subtotal-row">
//         <div>Total before tax:</div>
//         <div className="payment-summary-money">{formatCurrency(totalBeforeTax)}</div>
//       </div>

//       <div className="payment-summary-row">
//         <div>Estimated tax (10%):</div>
//         <div className="payment-summary-money">{formatCurrency(tax)}</div>
//       </div>

//       <div className="payment-summary-row total-row">
//         <div>Order total:</div>
//         <div className="payment-summary-money">{formatCurrency(total)}</div>
//       </div>

//       <button className="place-order-button button-primary" onClick={handlePlaceOrder}> 
//         Place your order
//       </button>

//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {error && <div className="error-message">{error}</div>}
//     </>
//   )
// }