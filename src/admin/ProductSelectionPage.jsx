import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProductSelectionPage = () => {
  const {
    products,
    puppies,
    selectedProducts,
    setSelectedProducts,
    selectedPuppies,
    setSelectedPuppies,
    formData,
    setFormData,
    setShowModal
  } = useCart();

  const navigate = useNavigate();

  /* =============================
     Sync existing selections (Edit Mode)
  ============================== */

  useEffect(() => {
    setSelectedProducts(formData.products || []);
    setSelectedPuppies(formData.puppies || []);
  }, [formData]);

  /* =============================
     Toggle Product
  ============================== */

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  /* =============================
     Toggle Puppy
  ============================== */

  const togglePuppy = (puppyId) => {
    setSelectedPuppies((prev) =>
      prev.includes(puppyId)
        ? prev.filter((id) => id !== puppyId)
        : [...prev, puppyId]
    );
  };

  /* =============================
     Done Button
  ============================== */

  const handleDone = () => {
    setFormData((prev) => ({
      ...prev,
      products: selectedProducts,
      puppies: selectedPuppies
    }));

    setShowModal(true);
    navigate(-1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Select Products & Puppies</h2>

      {/* ================= PRODUCTS ================= */}
      <h3>Products</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem"
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => toggleProduct(product._id)}
            style={{
              border: selectedProducts.includes(product._id)
                ? "2px solid blue"
                : "1px solid #ccc",
              padding: "1rem",
              cursor: "pointer",
              borderRadius: "8px",
              textAlign: "center"
            }}
          >
            <img
              src={`https://donda-puppies-backend.onrender.com${product.images[0]}`}
              alt={product.name}
              style={{
                width: "100%",
                height: "100px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
            />
            <p>{product.name}</p>
            <input
              type="checkbox"
              readOnly
              checked={selectedProducts.includes(product._id)}
            />
          </div>
        ))}
      </div>

      {/* ================= PUPPIES ================= */}

      <h3 style={{ marginTop: "2rem" }}>Puppies</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem"
        }}
      >
        {puppies.map((puppy) => (
          <div
            key={puppy._id}
            onClick={() => togglePuppy(puppy._id)}
            style={{
              border: selectedPuppies.includes(puppy._id)
                ? "2px solid green"
                : "1px solid #ccc",
              padding: "1rem",
              cursor: "pointer",
              borderRadius: "8px",
              textAlign: "center"
            }}
          >
            <img
              src={`https://donda-puppies-backend.onrender.com${puppy.images[0]}`}
              alt={puppy.name}
              style={{
                width: "100%",
                height: "100px",
                objectFit: "cover",
                borderRadius: "6px"
              }}
            />
            <p>{puppy.name}</p>
            <input
              type="checkbox"
              readOnly
              checked={selectedPuppies.includes(puppy._id)}
            />
          </div>
        ))}
      </div>

      {/* ================= DONE BUTTON ================= */}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleDone}>
          Done ({selectedProducts.length + selectedPuppies.length} selected)
        </button>
      </div>
    </div>
  );
};

export default ProductSelectionPage;