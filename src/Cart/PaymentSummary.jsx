import { formatCurrency } from "../utils/money";

export default function PaymentSummary({
  cartItems,
  handlePlaceOrder,
  successMessage,
  error,
}) {
  // Calculate totals dynamically
  let totalItems = 0;
  let productsPriceCents = 0;
  let puppiesPriceCents = 0;
  let servicesPriceCents = 0;
  let shippingPriceCents = 0;

  cartItems.forEach((item) => {
    totalItems += item.quantity;

    if (item.product) {
      productsPriceCents += item.product.priceCents * item.quantity;
      // Shipping option for products
      shippingPriceCents += item.deliveryOption?.priceCents || 0;
    }

    if (item.puppy) {
      puppiesPriceCents += item.puppy.priceCents * item.quantity;
      // Shipping option for puppies
      shippingPriceCents += item.deliveryOption?.priceCents || 0;
    }

    if (item.service) {
      servicesPriceCents += item.service.priceCents * item.quantity || 0;
    }
  });

  const totalBeforeTaxCents =
    productsPriceCents + puppiesPriceCents + servicesPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Products ({totalItems}):</div>
        <div className="payment-summary-money">
          {formatCurrency(productsPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Puppies:</div>
        <div className="payment-summary-money">{formatCurrency(puppiesPriceCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Services:</div>
        <div className="payment-summary-money">{formatCurrency(servicesPriceCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">{formatCurrency(shippingPriceCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">{formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">{formatCurrency(totalCents)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
        Place your order
      </button>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

// export default function PaymentSummary({productsPriceCents, shippingPriceCents, totalBeforeTaxCents, taxCents,  totalCents, totalItems, handlePlaceOrder, successMessage, error}) {
//   return(
//     <>
//       <div className="payment-summary-title">
//         Order Summary
//       </div>

//       <div className="payment-summary-row">
//         <div>Items ({totalItems}):</div>
//         <div className="payment-summary-money">{formatCurrency(productsPriceCents)}</div>
//       </div>

//       <div className="payment-summary-row">
//         <div>Shipping &amp; handling:</div>
//         <div className="payment-summary-money">{formatCurrency(shippingPriceCents)}</div>
//       </div>

//       <div className="payment-summary-row subtotal-row">
//         <div>Total before tax:</div>
//         <div className="payment-summary-money">{formatCurrency(totalBeforeTaxCents)}</div>
//       </div>

//       <div className="payment-summary-row">
//         <div>Estimated tax (10%):</div>
//         <div className="payment-summary-money">{formatCurrency(taxCents)}</div>
//       </div>

//       <div className="payment-summary-row total-row">
//         <div>Order total:</div>
//         <div className="payment-summary-money">{formatCurrency(totalCents)}</div>
//       </div>

//       <button className="place-order-button button-primary" onClick={handlePlaceOrder}> 
//         Place your order
//       </button>

//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {error && <div className="error-message">{error}</div>}
//     </>
//   )
// }