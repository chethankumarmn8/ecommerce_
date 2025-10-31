// Sidebar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaList,
  FaUser,
  FaEnvelope,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    // Clear all authentication tokens
    localStorage.removeItem("perfumerToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("perfumerId");
    navigate("/artisan/login");
  };

  return (
    <>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h4>Master Perfumer Atelier</h4>
          <button className="close-btn d-md-none" onClick={toggle}>
            &times;
          </button>
        </div>

        <div className="sidebar-menu">
          <Link
            to="/artisan/dashboard"
            className={
              location.pathname === "/artisan/dashboard" ? "active" : ""
            }
          >
            <FaHome className="icon" />
            <span className="text">Dashboard</span>
          </Link>
          <Link
            to="/artisan/dashboard/add-product"
            className={
              location.pathname.includes("/add-product") ? "active" : ""
            }
          >
            <FaPlus className="icon" />
            <span className="text">Add Product</span>
          </Link>
          <Link
            to="/artisan/dashboard/products"
            className={location.pathname.includes("/products") ? "active" : ""}
          >
            <FaBox className="icon" />
            <span className="text">Products</span>
          </Link>
          <Link
            to="/artisan/dashboard/orders"
            className={location.pathname.includes("/orders") ? "active" : ""}
          >
            <FaList className="icon" />
            <span className="text">Orders</span>
          </Link>
          <Link
            to="/artisan/dashboard/profile"
            className={location.pathname.includes("/profile") ? "active" : ""}
          >
            <FaUser className="icon" />
            <span className="text">Profile</span>
          </Link>
          <Link
            to="/artisan/dashboard/messages"
            className={location.pathname.includes("/messages") ? "active" : ""}
          >
            <FaEnvelope className="icon" />
            <span className="text">Messages</span>
          </Link>
          <Link
            to="/artisan/dashboard/analytics"
            className={location.pathname.includes("/analytics") ? "active" : ""}
          >
            <FaChartLine className="icon" />
            <span className="text">Analytics</span>
          </Link>
        </div>

        <button className="btn btn-danger mt-auto mx-3" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={toggle} />}
    </>
  );
};

export default Sidebar;
