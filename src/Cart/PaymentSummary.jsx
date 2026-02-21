import { formatCurrency } from "../utils/money"

export default function PaymentSummary({productsPriceCents, shippingPriceCents, totalBeforeTaxCents, taxCents,  totalCents, totalItems, handlePlaceOrder, successMessage, error}) {
  return(
    <>
      <div className="payment-summary-title">
        Order Summary
      </div>

      <div className="payment-summary-row">
        <div>Items ({totalItems}):</div>
        <div className="payment-summary-money">{formatCurrency(productsPriceCents)}</div>
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
  )
}