import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Sarah A.",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    review: "Absolutely love my new sofa! Super comfortable and stylish. Great customer service too.",
    rating: 5,
  },
  {
    id: 2,
    name: "James L.",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    review: "The dining table set exceeded my expectations. Sturdy and looks premium.",
    rating: 4,
  },
  {
    id: 3,
    name: "Lydia W.",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    review: "Quick delivery and excellent quality. Will definitely order again!",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
         >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <img src={review.photo} alt={review.name} className="profile-img" />
                <div className="review-stars">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className="star filled animate-star">★</span>
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="review-text">"{review.review}"</p>
                <p className="review-name">— {review.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerReviews;