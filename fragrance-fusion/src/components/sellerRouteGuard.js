import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "react-bootstrap";

const ArtisanRouteGuard = ({ children }) => {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    isValid: false,
    loading: true,
  });

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("perfumerToken");

      if (!token) {
        setAuthState({ isValid: false, loading: false });
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const isExpired = Date.now() >= decoded.exp * 1000;
        const isValidRole = decoded.role === "ROLE_PERFUMER";

        if (!isExpired && isValidRole) {
          setAuthState({ isValid: true, loading: false });
        } else {
          localStorage.removeItem("artisanToken");
          setAuthState({ isValid: false, loading: false });
        }
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("perfumerToken");
        setAuthState({ isValid: false, loading: false });
      }
    };

    // Initial validation
    validateToken();

    // Set up periodic checks every 60 seconds
    const interval = setInterval(validateToken, 60000);

    return () => clearInterval(interval);
  }, [location]); // Re-run when location changes

  if (authState.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
        <span className="ms-2">Verifying artisan credentials...</span>
      </div>
    );
  }

  if (!authState.isValid) {
    return <Navigate to="/artisan-login" state={{ from: location }} replace />;
  }

  return children;
};

export default ArtisanRouteGuard;
