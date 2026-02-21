import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size = 50, color = "#007bff" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
};

export default LoadingSpinner;