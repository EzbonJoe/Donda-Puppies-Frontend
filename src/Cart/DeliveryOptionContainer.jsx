import { useCart } from "../context/cartContext"

export default function DeliveryOptionContainer({isChecked, dateString, priceString, cartItem, deliveryOption}) {
  const {updateDeliveryOption} = useCart();
    return(
       <div className="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" onClick={() => updateDeliveryOption(cartItem.product._id, deliveryOption.id)}>
          <input type="radio"
            checked={isChecked ? "checked" : ""}
            className="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name={`delivery-option-${cartItem.product._id}`}  
            onChange={() => updateDeliveryOption(cartItem.product._id, deliveryOption.id)}
            value={deliveryOption.id}        
          />
            
          <div>
            <div className="delivery-option-date">
              {dateString}
            </div>
            <div className="delivery-option-price">  
              {priceString} Shipping
            </div>
          </div>
        </div>
    )
}