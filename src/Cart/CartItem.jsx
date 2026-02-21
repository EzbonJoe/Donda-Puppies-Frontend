import {useState} from "react";
import DeliveryOptionContainer from "./DeliveryOptionContainer";
import { useCart } from "../context/cartContext";
import { formatCurrency } from "../utils/money.js";

export default function CartItem({item, removeFromCart, updateCartItemQuantity, topDateString}) {

  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity || 1);
  const { deliveryOptions, calculateDeliveryDate } = useCart();

  const handleSave = () => {
    updateCartItemQuantity(item.product._id, Number(tempQuantity));
    setIsEditing(false);
  }

  return(
    <div className={`cart-item-container ${isEditing ? 'is-editing-quantity' : ''}`}>  
      <div className="delivery-date">
        Delivery date: {topDateString}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={`http://localhost:5000${item.product.images[0]}`}
          alt={item.product.name} 
        />

        <div className="cart-item-details">
          <div className="product-name">
            {item.product.name}
          </div>
          <div className="product-price">
           {formatCurrency(item.product.priceCents)}
          </div>
          <div className="product-quantity">           
            {isEditing ? (
              <>
                <input
                  type="number"
                  value={tempQuantity}
                  onChange={(e) => setTempQuantity(e.target.value)}
                  className={`quantity-input js-quantity-input-${item.product._id}`}
                />
                <span
                  className={`save-quantity-link link-primary js-save-quantity-link`}
                  onClick={handleSave}
                  style={{cursor: "pointer"}}
                >
                  Save
                </span>
              </>
            ) : (
                <>
                  <span className={`js-quantity-label-${item.product._id}`}>Quantity: {item.quantity}</span>

                  <span
                    className={`update-quantity-link link-primary js-update-quantity-link`}
                    onClick={() => setIsEditing(true)}
                  >
                    Update
                  </span>
                </>
            )}        
            <span className="delete-quantity-link link-primary" onClick={() => removeFromCart(item.product._id)}>
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          { deliveryOptions.map((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);            
            const priceString = deliveryOption.priceCents === 0 ? 'free': `${formatCurrency(deliveryOption.priceCents)} - `;
            const isChecked = deliveryOption.id === item.deliveryOptionId;
            return(
              <DeliveryOptionContainer
                cartItem={item}
                dateString={dateString}
                priceString={priceString}
                isChecked={isChecked}
                key={`delivery-option-${item.product._id}-${deliveryOption.id}`}
                deliveryOption={deliveryOption}
              />
            )
          })
          }
        </div>
      </div>
    </div>
  )
}
