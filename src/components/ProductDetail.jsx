import {useCart} from "../context/cartContext";
import {formatCurrency} from "../utils/money";
import LoadingSpinner from "./LoadingSpinner";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";




export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, addedMessages, products } = useCart();  


  useEffect(() => {
    if (products.length === 0) return;
    const foundInProducts = products.find((item) => item._id === id);  
    setProduct(foundInProducts);
    setLoading(false);
  }, [id, products]);
  
  if (loading) return <LoadingSpinner />;  

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="image-slider">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={`${img}`} alt={`${product.name} ${index + 1}`} className="slide-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <p className="price">{formatCurrency(product.priceCents)}</p>       
          {addedMessages[product._id] && (
              <div className={`added-to-cart ${addedMessages[product._id] ? 'show-message' : ''}`}>
                <img src="/images/icons/checkmark.png" alt="Check" />
                Added
              </div>
          )} 
        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}