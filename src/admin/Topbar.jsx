const Topbar = () => {
  return (
    <div className="topbar">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/products">Products</a></li>
          <li><a href="/admin/orders">Orders</a></li>
          <li><a href="/admin/users">Users</a></li>
        </ul>
      </nav>
    </div>
  );
}
export default Topbar;