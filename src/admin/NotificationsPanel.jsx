const NotificationsPanel = ({ count }) => {
  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>       
      <p>Pending Orders: {count}</p>
    </div>
  );
};

export default NotificationsPanel;