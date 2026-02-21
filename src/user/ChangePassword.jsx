import { useState } from "react";
import { toast } from "react-toastify";
import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirmation do not match");
    }

    setLoading(true);
    try {
      await userApi.changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      // Optionally redirect to login or profile page
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.info("Please log in again");      
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  }

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <div className="password-field">        
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <span
              className="toggle-password-icon"
              onClick={() => togglePasswordVisibility('current')}
            >
              {showPassword.current ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </label>

        <label>
          New Password:
          <div className="password-field">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <span
              className="toggle-password-icon"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPassword.new ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </label>

        <label>
          Confirm New Password:
          <div className="password-field">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="toggle-password-icon"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;