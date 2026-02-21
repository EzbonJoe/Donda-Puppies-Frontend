import wishlistApi from "../api/wishlistApi";
import { toast } from "react-toastify";

const WishlistButton = ({ productId }) => {
  const handleAddToWishlist = async () => {
    try {
      await wishlistApi.addToWishlist(productId);
      toast.success("Product added to wishlist successfully");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <button onClick={handleAddToWishlist} className="wishlist-button" style={{ marginLeft: '1rem' }}>
      ❤️ Add to Wishlist
    </button>
  );
}

export default WishlistButton;