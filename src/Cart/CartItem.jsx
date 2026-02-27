// import {useState} from "react";
// import DeliveryOptionContainer from "./DeliveryOptionContainer";
// import { useCart } from "../context/cartContext";
// import { formatCurrency } from "../utils/money.js";

import { useState } from "react";
import DeliveryOptionContainer from "./DeliveryOptionContainer";
import { useCart } from "../context/cartContext";
import { formatCurrency } from "../utils/money.js";

export default function CartItem({ item, removeFromCart, updateCartItemQuantity, topDateString }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(item.quantity || 1);
  const { deliveryOptions, calculateDeliveryDate } = useCart();

  // Determine item type and data
  const data = item.product || item.puppy || item.service;
  const type = item.product
    ? "product"
    : item.puppy
    ? "puppy"
    : "service";

  const handleSave = () => {
    updateCartItemQuantity(data._id, Number(tempQuantity), type);
    setIsEditing(false);
  };

  return (
    <div className={`cart-item-container ${isEditing ? "is-editing-quantity" : ""}`}>
      {/* Only show delivery date for items with delivery (products & puppies) */}
      {(type === "product" || type === "puppy") && (
        <div className="delivery-date">Delivery date: {topDateString}</div>
      )}

      <div className="cart-item-details-grid">
        {/* Show image if available */}
        {data.images && data.images.length > 0 && (
          <img
            className="product-image"
            src={`${data.images[0]}`}
            alt={data.name}
          />
        )}

        <div className="cart-item-details">
          <div className="product-name">{data.name}</div>

          {/* Price only for products & puppies */}
          {(type === "product" || type === "puppy") && (
            <div className="product-price">{formatCurrency(data.price)}</div>
          )}

          {/* Quantity management */}
          <div className="product-quantity">
            {isEditing ? (
              <>
                <input
                  type="number"
                  value={tempQuantity}
                  onChange={(e) => setTempQuantity(e.target.value)}
                  className={`quantity-input js-quantity-input-${data._id}`}
                />
                <span
                  className="save-quantity-link link-primary js-save-quantity-link"
                  onClick={handleSave}
                  style={{ cursor: "pointer" }}
                >
                  Save
                </span>
              </>
            ) : (
              <>
                <span className={`js-quantity-label-${data._id}`}>
                  Quantity: {item.quantity}
                </span>
                <span
                  className="update-quantity-link link-primary js-update-quantity-link"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </span>
              </>
            )}

            <span
              className="delete-quantity-link link-primary"
              onClick={() => removeFromCart(data._id, type)}
            >
              Delete
            </span>
          </div>
        </div>

        {/* Delivery options only for products & puppies */}
        {(type === "product" || type === "puppy") && (
          <div className="delivery-options">
            <div className="delivery-options-title">Choose a delivery option:</div>
            {deliveryOptions.map((deliveryOption) => {
              const dateString = calculateDeliveryDate(deliveryOption);
              const priceString =
                deliveryOption.price === 0
                  ? "free"
                  : `${formatCurrency(deliveryOption.price)} - `;
              const isChecked = deliveryOption.id === item.deliveryOptionId;
              return (
                <DeliveryOptionContainer
                  cartItem={item}
                  dateString={dateString}
                  priceString={priceString}
                  isChecked={isChecked}
                  key={`delivery-option-${data._id}-${deliveryOption.id}`}
                  deliveryOption={deliveryOption}
                />
              );
            })}
          </div>
        )}

        {/* Extra info for puppies */}
        {type === "puppy" && (
          <div className="puppy-info">
            <p>Vaccinated: {data.vaccinated ? "Yes" : "No"}</p>
            <p>Dewormed: {data.dewormed ? "Yes" : "No"}</p>
            <p>Trained: {data.trained ? "Yes" : "No"}</p>
          </div>
        )}

        {/* Extra info for services */}
        {type === "service" && item.serviceDate && (
          <div className="service-info">
            <p>Service Date: {new Date(item.serviceDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// export default function CartItem({item, removeFromCart, updateCartItemQuantity, topDateString}) {

//   const [isEditing, setIsEditing] = useState(false);
//   const [tempQuantity, setTempQuantity] = useState(item.quantity || 1);
//   const { deliveryOptions, calculateDeliveryDate } = useCart();

//   const handleSave = () => {
//     updateCartItemQuantity(item.product._id, Number(tempQuantity));
//     setIsEditing(false);
//   }

//   return(
//     <div className={`cart-item-container ${isEditing ? 'is-editing-quantity' : ''}`}>  
//       <div className="delivery-date">
//         Delivery date: {topDateString}
//       </div>

//       <div className="cart-item-details-grid">
//         <img className="product-image"
//           src={`https://donda-puppies-backend.onrender.com${item.product.images[0]}`}
//           alt={item.product.name} 
//         />

//         <div className="cart-item-details">
//           <div className="product-name">
//             {item.product.name}
//           </div>
//           <div className="product-price">
//            {formatCurrency(item.product.price)}
//           </div>
//           <div className="product-quantity">           
//             {isEditing ? (
//               <>
//                 <input
//                   type="number"
//                   value={tempQuantity}
//                   onChange={(e) => setTempQuantity(e.target.value)}
//                   className={`quantity-input js-quantity-input-${item.product._id}`}
//                 />
//                 <span
//                   className={`save-quantity-link link-primary js-save-quantity-link`}
//                   onClick={handleSave}
//                   style={{cursor: "pointer"}}
//                 >
//                   Save
//                 </span>
//               </>
//             ) : (
//                 <>
//                   <span className={`js-quantity-label-${item.product._id}`}>Quantity: {item.quantity}</span>

//                   <span
//                     className={`update-quantity-link link-primary js-update-quantity-link`}
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Update
//                   </span>
//                 </>
//             )}        
//             <span className="delete-quantity-link link-primary" onClick={() => removeFromCart(item.product._id)}>
//               Delete
//             </span>
//           </div>
//         </div>

//         <div className="delivery-options">
//           <div className="delivery-options-title">
//             Choose a delivery option:
//           </div>
//           { deliveryOptions.map((deliveryOption) => {
//             const dateString = calculateDeliveryDate(deliveryOption);            
//             const priceString = deliveryOption.price === 0 ? 'free': `${formatCurrency(deliveryOption.price)} - `;
//             const isChecked = deliveryOption.id === item.deliveryOptionId;
//             return(
//               <DeliveryOptionContainer
//                 cartItem={item}
//                 dateString={dateString}
//                 priceString={priceString}
//                 isChecked={isChecked}
//                 key={`delivery-option-${item.product._id}-${deliveryOption.id}`}
//                 deliveryOption={deliveryOption}
//               />
//             )
//           })
//           }
//         </div>
//       </div>
//     </div>
//   )
// }


