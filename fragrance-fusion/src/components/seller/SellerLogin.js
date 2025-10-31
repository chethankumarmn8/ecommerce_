import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaLock, FaEnvelope, FaSpinner } from "react-icons/fa";

const PerfumerLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const goldGradient = "linear-gradient(135deg, #4A2D7A 0%, #D4AF37 100%)";
  const purpleShadow = "0 4px 20px rgba(74, 45, 122, 0.3)";

  useEffect(() => {
    const token = localStorage.getItem("perfumerToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = Date.now() >= decoded.exp * 1000;
        const isPerfumer = decoded.role === "ROLE_PERFUMER";
        if (!isExpired && isPerfumer) {
          navigate("/artisan/dashboard", { replace: true });
        }
      } catch (err) {
        console.error("Token validation error:", err);
        localStorage.removeItem("perfumerToken");
        localStorage.removeItem("perfumerId");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/perfumer/auth/login",
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem("perfumerToken", response.data.token);
        localStorage.setItem("perfumerId", decoded.userId);
        navigate("/artisan/dashboard", { replace: true });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Invalid email or password";
      setError(errorMessage);
      localStorage.removeItem("perfumerToken");
      localStorage.removeItem("perfumerId");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ minHeight: "100vh" }}>
      <div
        className="card border-0 shadow-lg overflow-hidden mx-auto"
        style={{
          maxWidth: "500px",
          borderRadius: "20px",
          marginTop: "5rem",
          animation: "fadeIn 0.8s ease-out",
          background: "linear-gradient(145deg, #f8f5ff, #ffffff)",
        }}
      >
        <div
          className="card-header text-center py-4 position-relative"
          style={{
            background: goldGradient,
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
            paddingBottom: "3rem",
          }}
        >
          <h2 className="mb-3 text-white fw-bold">
            🧪 Master Perfumer Atelier
          </h2>
          <p className="text-light mb-0">Olfactory Creation Portal</p>
        </div>

        <div className="card-body p-4 p-md-5">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-4">
              <label className="form-label fw-semibold d-flex align-items-center">
                <FaEnvelope className="me-2" style={{ color: "#D4AF37" }} />
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                style={{ borderRadius: "15px", paddingLeft: "2.5rem" }}
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                placeholder="perfumer@example.com"
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold d-flex align-items-center">
                <FaLock className="me-2" style={{ color: "#D4AF37" }} />
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                style={{ borderRadius: "15px", paddingLeft: "2.5rem" }}
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter your secret scent"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-3 fw-bold text-white position-relative overflow-hidden"
              disabled={isLoading}
              style={{
                background: goldGradient,
                borderRadius: "15px",
                border: "none",
                boxShadow: purpleShadow,
                transition: "all 0.3s ease",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <FaSpinner className="spinner me-2" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Unlock Atelier</span>
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)",
                      animation: "shine 2s infinite linear",
                      opacity: 0.3,
                    }}
                  />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-2">
              New perfumer?{" "}
              <Link
                to="/artisan-register"
                className="text-decoration-none fw-semibold"
                style={{ color: "#D4AF37" }}
              >
                Join our Guild of Noses
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="text-decoration-none small"
              style={{ color: "#4A2D7A" }}
            >
              Forgot your secret scent?
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PerfumerLogin;
