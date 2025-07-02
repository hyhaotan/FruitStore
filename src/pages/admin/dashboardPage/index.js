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
  // State cho dữ liệu biểu đồ tròn (sản phẩm tồn kho)
  const [pieData, setPieData] = useState([]);
  // State cho dữ liệu thống kê số lượng sản phẩm đã bán
  const [productSalesData, setProductSalesData] = useState([]);
  // State cho dữ liệu thống kê doanh thu theo tháng
  const [revenueData, setRevenueData] = useState([]);

  // Mảng màu cho charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA00FF",
    "#FF3366",
    "#33FF99",
  ];

  useEffect(() => {
    fetchProducts();
    fetchProductSales();
    fetchRevenue();
  }, []);

  // Lấy dữ liệu sản phẩm và chuyển đổi cho PieChart tồn kho
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

  // Lấy dữ liệu thanh toán, nhóm theo sản phẩm để tính số lượng đã bán
  const fetchProductSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      const payments = res.data;

      // Tổng hợp số lượng bán theo tên sản phẩm
      const salesByProduct = payments.reduce((acc, payment) => {
        payment.cartItems.forEach((item) => {
          const name = item.name;
          acc[name] = (acc[name] || 0) + item.quantity;
        });
        return acc;
      }, {});

      // Chuyển thành mảng dữ liệu cho BarChart số lượng bán
      const salesData = Object.keys(salesByProduct).map((name) => ({
        name,
        Sold: salesByProduct[name],
      }));
      setProductSalesData(salesData);
    } catch (error) {
      console.error("Error fetching product sales:", error);
    }
  };

  // Lấy dữ liệu doanh thu theo tháng
  const fetchRevenue = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      const payments = res.data;

      // Nhóm theo tháng và tính tổng finalTotal
      const revByMonth = payments.reduce((acc, payment) => {
        const month = new Date(payment.createdAt).getMonth() + 1;
        acc[month] = (acc[month] || 0) + payment.finalTotal;
        return acc;
      }, {});

      // Chuyển thành mảng dữ liệu cho BarChart doanh thu
      const revData = Object.keys(revByMonth).map((month) => ({
        month: `Tháng ${month}`,
        Revenue: revByMonth[month],
      }));
      setRevenueData(revData);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="charts-container">
        {/* Biểu đồ tròn: Thống kê sản phẩm tồn kho */}
        <div className="chart-item pie-chart">
          <h2>Sản phẩm tồn kho</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ cột: Thống kê số lượng sản phẩm đã bán */}
        <div className="chart-item bar-chart">
          <h2>Số lượng sản phẩm đã bán</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sold" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ cột: Doanh thu theo tháng */}
        <div className="chart-item bar-chart">
          <h2>Doanh thu theo tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Revenue" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(DashboardPage);
