import { useState, useEffect } from "react";
import userApi from "../api/userApi";
import LoadingSpinner from "../components/LoadingSpinner";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (id, currentIsAdmin) => {
    try {
      const res = await userApi.updateUser(id, { isAdmin: !currentIsAdmin });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? res.data : user))
      );
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await userApi.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="users-page">
      <h2>Users</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Admin">{user.isAdmin ? "Yes" : "No"}</td>
                <td data-label="Registered">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td data-label="Actions" className="actions">
                  <button
                    onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    className="promote"
                  >
                    {user.isAdmin ? "Demote" : "Promote"}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default UsersPage;