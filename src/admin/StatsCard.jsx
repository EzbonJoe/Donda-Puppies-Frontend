const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      {icon && <div className="stats-card-icon">{icon}</div>}
      <div className="stats-card-info">
        <h3 className="stats-card-title">{title}</h3>
        <p className="stats-card-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;