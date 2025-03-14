import { memo, useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import "./style.scss";

const DashboardPage = () => {
  // State cho dữ liệu biểu đồ tròn (sản phẩm)
  const [pieData, setPieData] = useState([]);
  // State cho dữ liệu biểu đồ cột (payments)
  const [barData, setBarData] = useState([]);

  // Mảng màu cho PieChart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

  useEffect(() => {
    fetchProducts();
    fetchPayments();
  }, []);

  // Lấy dữ liệu sản phẩm và chuyển đổi cho PieChart
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const products = res.data;
      const newPieData = products.map((product) => ({
        name: product.name,
        value: product.quantity,
      }));
      setPieData(newPieData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Lấy dữ liệu Payment, nhóm theo tháng và tính tổng finalTotal cho từng tháng
  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      const payments = res.data;

      // Nhóm payment theo tháng (dùng createdAt)
      const paymentsByMonth = payments.reduce((acc, payment) => {
        const date = new Date(payment.createdAt);
        const month = date.getMonth() + 1; // Lấy tháng (1-12)
        acc[month] = (acc[month] || 0) + payment.finalTotal;
        return acc;
      }, {});

      // Chuyển đổi đối tượng thành mảng cho BarChart
      const newBarData = Object.keys(paymentsByMonth).map((month) => ({
        name: `Tháng ${month}`,
        Tổngtiền: paymentsByMonth[month],
      }));

      setBarData(newBarData);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="charts-container">
        {/* Biểu đồ tròn: Thống kê số lượng sản phẩm */}
        <div className="chart-item pie-chart">
          <h2>Thống kê số lượng sản phẩm</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ cột: Tổng số tiền theo tháng */}
        <div className="chart-item bar-chart">
          <h2>Tổng số tiền theo tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tổngtiền" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardPage);
