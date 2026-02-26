import { useCart } from "../context/cartContext";
import { formatCurrency } from "../utils/money";
import LoadingSpinner from "./LoadingSpinner";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PuppyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [puppy, setPuppy] = useState(null);
  const [loading, setLoading] = useState(true);

  const { puppies } = useCart();

  useEffect(() => {
    if (puppies.length === 0) return;

    const foundInPuppies = puppies.find((item) => item._id === id);

    setPuppy(foundInPuppies);
    setLoading(false);
  }, [id, puppies]);

  if (loading) return <LoadingSpinner />;

  if (!puppy) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Puppy not found
      </h2>
    );
  }

  const handleBuyNow = () => {
    if (!puppy.isAvailable) return;
    navigate(`/puppy-cart`);
  };

  return (
    <div className="product-detail-container">
      
      {/* Image Slider */}
      <div className="image-slider">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
        >
          {puppy.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${puppy.name} ${index + 1}`}
                className="slide-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Puppy Info */}
      <div className="product-info">
        <h1>{puppy.name}</h1>
        <p className="description">{puppy.description}</p>

        <p className="price">
          {formatCurrency(puppy.priceCents)}
        </p>

        <div className="puppy-attributes">
          <p><strong>Breed:</strong> {puppy.breed}</p>
          <p><strong>Gender:</strong> {puppy.gender}</p>
          <p><strong>Age:</strong> {puppy.ageInWeeks} weeks</p>
          <p><strong>Vaccinated:</strong> {puppy.vaccinated ? "Yes" : "No"}</p>
          <p><strong>Dewormed:</strong> {puppy.dewormed ? "Yes" : "No"}</p>
          <p><strong>Trained:</strong> {puppy.trained ? "Yes" : "No"}</p>
        </div>

        {/* Availability Badge */}
        <div className={`availability ${puppy.isAvailable ? "available" : "sold"}`}>
          {puppy.isAvailable ? "Available" : "Sold"}
        </div>

        {/* Buy Now Button */}
        <button
          className="buy-now-button"
          onClick={handleBuyNow}
          disabled={!puppy.isAvailable}
        >
          {puppy.isAvailable ? "Buy Now" : "Already Sold"}
        </button>
      </div>
    </div>
  );
}