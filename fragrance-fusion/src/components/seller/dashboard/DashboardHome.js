import React, { useState, useEffect } from "react";
import sellerDashboardService from "../../services/sellerDashboardServices"; // Adjust the import path as necessary
const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    topProducts: [],
    recentOrders: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await sellerDashboardService.getDashboardStats();
        setStats(response.data); // Assuming your backend returns data in the correct format
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container p-4">
      <h1>Welcome to Your Dashboard</h1>
      <div className="row">
        {/* Total Products Card */}
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        {/* Total Orders Card */}
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        {/* Total Revenue Card */}
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {/* Recent Orders */}
        <div className="col-md-6">
          <h3>Recent Orders</h3>
          <ul className="list-group">
            {stats.recentOrders.map((order) => (
              <li key={order.id} className="list-group-item">
                {order.productName} - {order.status}
              </li>
            ))}
          </ul>
        </div>
        {/* Top Selling Products */}
        <div className="col-md-6">
          <h3>Top Selling Products</h3>
          <ul className="list-group">
            {stats.topProducts.map((product) => (
              <li key={product.id} className="list-group-item">
                {product.name} - {product.sales} sales
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
