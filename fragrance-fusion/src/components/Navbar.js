import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Modal,
  Button,
  Form,
  Dropdown,
  Alert,
  Spinner,
  Container,
  Nav,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

function Navbar() {
  // State declarations
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cartItems] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmailTouched, setLoginEmailTouched] = useState(false);
  const [loginPasswordTouched, setLoginPasswordTouched] = useState(false);
  const [registerEmailTouched, setRegisterEmailTouched] = useState(false);
  const [registerPasswordTouched, setRegisterPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Auto-dismiss alerts after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (error || success) {
        setError("");
        setSuccess("");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [error, success]);

  // Password validation regex
  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Enhanced JWT parsing with role extraction
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return {
        email: decoded.sub,
        role: decoded.role,
      };
    } catch (e) {
      return null;
    }
  };

  // Modified auth check with role validation
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const decoded = parseJwt(token);
    if (decoded?.role === "ROLE_USER") {
      setIsLoggedIn(true);
      setUserEmail(decoded.email);
    } else {
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
    }
  }, []);

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Enhanced login handler with role verification
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || "Login failed";
        if (response.status === 403) errorMessage = "Invalid account type";
        throw new Error(errorMessage);
      }

      const { token } = data;
      const decoded = parseJwt(token);

      if (decoded?.role !== "ROLE_USER") {
        localStorage.removeItem("userToken");
        throw new Error("Invalid account type");
      }

      localStorage.setItem("userToken", token);
      setUserEmail(decoded?.email || "");
      setIsLoggedIn(true);
      setSuccess("Successfully logged in!");
      setTimeout(() => {
        setShowLogin(false);
        navigate("/");
      }, 1500);
    } catch (err) {
      const message = err.message.toLowerCase();
      if (message.includes("not found")) {
        setError("Email not registered. Please create an account.");
      } else if (
        message.includes("invalid credentials") ||
        message.includes("password")
      ) {
        setError("Incorrect password. Please try again.");
      } else if (message.includes("invalid account type")) {
        setError("Please use the correct login portal for your account type.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced registration handler with role check
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(registerEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(registerPassword)) {
      setError("Password must meet all complexity requirements.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || "Registration failed";
        if (response.status === 409) errorMessage = "Email already registered";
        throw new Error(errorMessage);
      }

      const { token } = data;
      const decoded = parseJwt(token);

      if (decoded?.role !== "ROLE_USER") {
        localStorage.removeItem("userToken");
        throw new Error("Registration created wrong account type");
      }

      setSuccess("Registration successful! Please login.");
      setTimeout(() => {
        setShowRegister(false);
        setShowLogin(true);
        setLoginEmail(registerEmail);
        resetRegisterForm();
      }, 2000);
    } catch (err) {
      setError(
        err.message.includes("already")
          ? "Email already registered. Please login."
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Form reset helper
  const resetRegisterForm = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
    setRegisterEmailTouched(false);
    setRegisterPasswordTouched(false);
    setConfirmPasswordTouched(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setUserEmail("");
    setSuccess("Successfully logged out!");
    navigate("/");
  };

  // Updated color scheme styles
  const styles = {
    brand: {
      color: "#4a2d7a",
      fontWeight: "700",
      letterSpacing: "1px",
      fontSize: "1.5rem",
      textTransform: "uppercase"
    },
    navLink: {
      color: "#4a2d7a",
      fontWeight: "500",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease",
      textDecoration: "none",
    },
    activeLink: {
      color: "#d4af37",
      transform: "translateY(-2px)",
      fontWeight: "600",
    },
    dropdown: {
      backgroundColor: "#f8f6fb",
      border: "1px solid #e5e0f0",
      borderRadius: "0.5rem",
      marginTop: "0.5rem",
    },
    dropdownItem: {
      color: "#4a2d7a",
      padding: "0.5rem 1rem",
      transition: "all 0.3s ease",
    },
    searchInput: {
      borderRadius: "2rem 0 0 2rem",
      borderRight: "none",
      borderColor: "#d4af37"
    },
    searchButton: {
      borderRadius: "0 2rem 2rem 0",
      backgroundColor: "#d4af37",
      borderColor: "#d4af37",
      transition: "all 0.3s ease",
    },
    cartBadge: {
      backgroundColor: "#6f42c1",
      color: "white",
      fontSize: "0.75rem",
      borderRadius: "1rem",
    },
    goldText: {
      color: "#d4af37"
    },
    purpleText: {
      color: "#4a2d7a"
    },
    dangerText: {
      color: "#dc3545"
    },
    buttonOutline: {
      borderColor: "#d4af37",
      color: "#d4af37",
    }
  };

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" onClose={() => setSuccess("")} dismissible>
            {success}
          </Alert>
        )}
      </div>

      <BsNavbar
        expand="lg"
        className="shadow-sm sticky-top"
        bg="light"
        variant="light"
        style={{ zIndex: 1050 }} /* Ensure Navbar stays above Sidebar */
      >
        <Container fluid>
          <Link
            className="navbar-brand"
            to="/"
            style={styles.brand}
          >
            FragranceFusion
          </Link>

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BsNavbar.Collapse id="basic-navbar-nav">
            <Form
              className="d-flex mx-lg-auto my-3 my-lg-0"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <div className="input-group">
                <Form.Control
                  type="search"
                  placeholder="Search luxury fragrances..."
                  style={styles.searchInput}
                />
                <Button variant="primary" style={styles.searchButton}>
                  <FaSearch />
                </Button>
              </div>
            </Form>

            <Nav className="ms-auto align-items-center gap-lg-3">
              <NavLink
                to="/marketplace"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                Marketplace
              </NavLink>

              <NavLink
                to="/inspiration"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                Inspiration
              </NavLink>

              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) =>
                  isActive
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                About
              </NavLink>

              <Link
                to="/cart"
                className="nav-link position-relative"
                style={styles.navLink}
              >
                <FaShoppingCart size={20} />
                {cartItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge"
                    style={styles.cartBadge}
                  >
                    {cartItems}
                  </span>
                )}
              </Link>

              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outline-primary"
                    className="rounded-pill px-4"
                    onClick={() => setShowLogin(true)}
                    style={styles.buttonOutline}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    className="rounded-pill px-4"
                    onClick={() => setShowRegister(true)}
                    style={{
                      backgroundColor: "#6f42c1",
                      borderColor: "#6f42c1",
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-user"
                    className="d-flex align-items-center text-decoration-none"
                    style={styles.navLink}
                  >
                    <FaUser className="me-2" /> {userEmail}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={styles.dropdown}>
                    <Dropdown.Header className="small text-muted">
                      Premium Account
                    </Dropdown.Header>
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                      style={styles.dropdownItem}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/orders"
                      style={styles.dropdownItem}
                    >
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/settings"
                      style={styles.dropdownItem}
                    >
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      style={{ ...styles.dropdownItem, ...styles.dangerText }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>

      {/* Login Modal */}
      <Modal
        show={showLogin}
        onHide={() => {
          setShowLogin(false);
          setLoginEmail("");
          setLoginPassword("");
          setError("");
          setSuccess("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.goldText}>Premium Member Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onBlur={() => setLoginEmailTouched(true)}
                isInvalid={loginEmailTouched && !validateEmail(loginEmail)}
                autoFocus
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onBlur={() => setLoginPasswordTouched(true)}
                isInvalid={loginPasswordTouched && !loginPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-pill"
              style={styles.searchButton}
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>

            <div className="text-center mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4af37",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Register here
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal
        show={showRegister}
        onHide={() => {
          setShowRegister(false);
          resetRegisterForm();
          setError("");
          setSuccess("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={styles.purpleText}>Create Premium Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                onBlur={() => setRegisterEmailTouched(true)}
                isInvalid={
                  registerEmailTouched && !validateEmail(registerEmail)
                }
                autoFocus
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="At least 8 characters with uppercase, number & special character"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                onBlur={() => setRegisterPasswordTouched(true)}
                isInvalid={
                  registerPasswordTouched && !validatePassword(registerPassword)
                }
                required
              />
              <Form.Text className="text-muted">
                Password must contain:
                <ul className="small mt-1">
                  <li>Minimum 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character (@$!%*?&)</li>
                </ul>
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Password must meet all complexity requirements
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setConfirmPasswordTouched(true)}
                isInvalid={
                  confirmPasswordTouched && registerPassword !== confirmPassword
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-pill"
              style={styles.searchButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Register"
              )}
            </Button>

            <div className="text-center mt-3">
              Already have an account?{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6f42c1",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Login here
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbar;