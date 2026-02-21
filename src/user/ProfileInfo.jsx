import { useState, useEffect } from "react";
import userApi from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner"; 

const ProfileInfo = () => {
  const [user, setUser] = useState(null);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await userApi.getProfile();
        setUser(data);
        setFormData({...data, phone: data.phone || ""}); // Ensure phone is defined
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [ ]);    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { data } = await userApi.updateProfile(formData);
      setUser(data.user);
      setEditing(false);
      const storedUser = JSON.parse(localStorage.getItem("user")) || {}
      localStorage.setItem("user", JSON.stringify({ ...storedUser, ...data.user }));
    } catch (error) {
      console.error("Update failed:", error.response?.data || error);
    }
  };

  if (loading) return <LoadingSpinner />; 

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Information</h2>

      <div className="profile-card">
        <div className="profile-avatar">
          <img src={user.avatar} alt="User Avatar" />
        </div>

        <div className="profile-details">
          {editing ? (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-actions">
                <button className="btn primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn secondary" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>

              <div className="profile-actions">
                <button className="btn primary" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;