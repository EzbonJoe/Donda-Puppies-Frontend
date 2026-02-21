import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SalesChart = ({ earningsData, ordersData }) => {
  const [chartType, setChartType] = useState("earnings");

  const chartData = chartType === "earnings" ? earningsData : ordersData;
  const dataKey = chartType === "earnings" ? "monthlyTotal" : "ordersCount";
  const label = chartType === "earnings" ? "Earnings" : "Orders";

  return (
    <div className="sales-chart">
      <div className="chart-header">
        <h3>Sales Overview</h3>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="earnings">Monthly Earnings</option>
          <option value="orders">Monthly Orders</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} name={label} stroke="#4f46e5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;