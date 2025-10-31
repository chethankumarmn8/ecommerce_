import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import Components
import CustomNavbar from "./components/Navbar";

import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/Brands";
import AboutUs from "./pages/aboutus";
import ArtisanResponsibilities from "./pages/SellerResponsibilies";

import ArtisanLogin from "./components/seller/SellerLogin";
import ArtisanRegister from "./components/seller/SellerRegister";

// Import Artisan Dashboard Components
import ArtisanDashboard from "./components/seller/dashboard/ArtisanDashboard";
import DashboardHome from "./components/seller/dashboard/DashboardHome";
import OrderList from "./components/seller/dashboard/OrderList";
import ProfileSettings from "./components/seller/dashboard/ProfileSettings";
import AddProductForm from "./components/seller/dashboard/AddProductForm";
import MyProducts from "./components/seller/dashboard/MyProducts";
import EditProductForm from "./components/seller/dashboard/EditProductModal"; // Import EditProductForm

// Import ProtectedRoute
import ArtisanRouteGuard from "./components/sellerRouteGuard";

function App() {
  const location = useLocation();

  // Auto-logout on token expiration


  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <CustomNavbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/artisan-responsibilities"
          element={<ArtisanResponsibilities />}
        />

        <Route path="/inspiration" element={<BrandPage />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Artisan Authentication Routes */}
        <Route path="/artisan-login" element={<ArtisanLogin />} />
        <Route path="/artisan-register" element={<ArtisanRegister />} />

        {/* Artisan Dashboard (Protected Routes) */}
        <Route
          path="/artisan/dashboard"
          element={
            <ArtisanRouteGuard>
              <ArtisanDashboard />
            </ArtisanRouteGuard>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="add-product" element={<AddProductForm />} />
          <Route path="products" element={<MyProducts />} />
          <Route
            path="edit-product/:productId"
            element={<EditProductForm />}
          />
          <Route path="orders" element={<OrderList />} />
          <Route path="profile" element={<ProfileSettings />} />
          {/* Future nested routes: analytics, chat, etc. */}
        </Route>

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Render Footer only on the HomePage */}
      {location.pathname === "/" && <Footer />}
    </div>
  );
}

export default App;
