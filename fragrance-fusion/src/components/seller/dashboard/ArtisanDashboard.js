// ArtisanDashboard.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./ArtisanDashboard.css";

const ArtisanDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="main-content">
        <button
          className="sidebar-toggle btn btn-primary d-md-none"
          style={{ marginTop: "60px" }} /* Adjust for Navbar height */
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ArtisanDashboard;
