import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PerfumerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fragranceType: "",
    experience: "",
    certification: null,
    mobile: "",
    location: "",
    keyIngredients: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
        if (alert.type === "success") navigate("/artisan-login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.fragranceType.trim())
      newErrors.fragranceType = "Fragrance type is required";
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (formData.experience < 0) {
      newErrors.experience = "Experience cannot be negative";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number (10 digits required)";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.keyIngredients.trim()) {
      newErrors.keyIngredients = "Please list key ingredients";
    }
    if (!formData.certification) {
      newErrors.certification = "Certification upload is required";
    } else if (formData.certification.type !== "application/pdf") {
      newErrors.certification = "Certification must be a PDF file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/perfumer/auth/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setAlert({
          show: true,
          message: "Registration Successful! Redirecting to login...",
          type: "success",
        });
      }
    } catch (error) {
      const backendError = error.response?.data?.message;
      setAlert({
        show: true,
        message: backendError || "Registration failed. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{
          maxWidth: "700px",
          borderRadius: "15px",
          background: "linear-gradient(145deg, #f8f5ff, #ffffff)",
        }}
      >
        {alert.show && (
          <div
            className={`alert ${
              alert.type === "success" ? "alert-success" : "alert-danger"
            } d-flex align-items-center`}
            style={{
              borderRadius: "0",
              margin: 0,
              borderLeft: `5px solid ${
                alert.type === "success" ? "#28a745" : "#dc3545"
              }`,
            }}
          >
            <span className="me-2 fs-4">
              {alert.type === "success" ? "✅" : "⚠️"}
            </span>
            <div>
              <h5 className="mb-1">
                {alert.type === "success" ? "Success!" : "Error!"}
              </h5>
              <p className="mb-0 small">{alert.message}</p>
            </div>
          </div>
        )}

        <div
          className="card-header text-center py-4"
          style={{
            backgroundColor: "#4A2D7A",
            color: "#fff",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <h2 className="mb-0">🌸 Master Perfumer Registration</h2>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                {
                  label: "Fragrance Type",
                  name: "fragranceType",
                  type: "select",
                  options: ["Floral", "Oriental", "Woody", "Fresh", "Citrus"],
                },
                {
                  label: "Experience (Years)",
                  name: "experience",
                  type: "number",
                },
                { label: "Mobile Number", name: "mobile", type: "tel" },
                { label: "Location", name: "location", type: "text" },
                { label: "Password", name: "password", type: "password" },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                },
              ].map((field, index) =>
                field.type === "select" ? (
                  <div className="col-12 col-md-6" key={index}>
                    <div className="form-floating">
                      <select
                        name={field.name}
                        className={`form-control ${
                          errors[field.name] ? "is-invalid" : ""
                        }`}
                        value={formData[field.name]}
                        onChange={handleChange}
                        style={{
                          borderRadius: "25px",
                          border: "1px solid #4A2D7A",
                        }}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <label>{field.label}</label>
                      {errors[field.name] && (
                        <div className="invalid-feedback ms-3">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="col-12 col-md-6" key={index}>
                    <div className="form-floating">
                      <input
                        type={field.type}
                        name={field.name}
                        className={`form-control ${
                          errors[field.name] ? "is-invalid" : ""
                        }`}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                        min={field.type === "number" ? "0" : undefined}
                        style={{
                          borderRadius: "25px",
                          border: "1px solid #4A2D7A",
                        }}
                      />
                      <label>{field.label}</label>
                      {errors[field.name] && (
                        <div className="invalid-feedback ms-3">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    name="keyIngredients"
                    className={`form-control ${
                      errors.keyIngredients ? "is-invalid" : ""
                    }`}
                    placeholder="Key Ingredients"
                    value={formData.keyIngredients}
                    onChange={handleChange}
                    style={{
                      height: "100px",
                      borderRadius: "15px",
                      border: "1px solid #4A2D7A",
                    }}
                  />
                  <label>Signature Ingredients</label>
                  {errors.keyIngredients && (
                    <div className="invalid-feedback ms-3">
                      {errors.keyIngredients}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <label
                    className="input-group-text"
                    style={{
                      borderRadius: "15px 0 0 15px",
                      backgroundColor: "#4A2D7A",
                      color: "#fff",
                    }}
                  >
                    📜 Perfumer Certification
                  </label>
                  <input
                    type="file"
                    name="certification"
                    className={`form-control ${
                      errors.certification ? "is-invalid" : ""
                    }`}
                    accept="application/pdf"
                    onChange={handleChange}
                    style={{
                      borderRadius: "0 15px 15px 0",
                      border: "1px solid #4A2D7A",
                    }}
                  />
                </div>
                {errors.certification && (
                  <div className="text-danger small mt-2 ms-3">
                    {errors.certification}
                  </div>
                )}
              </div>

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn w-100 py-3 fw-bold text-white"
                  style={{
                    backgroundColor: "#D4AF37",
                    borderRadius: "25px",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "translateY(0)")
                  }
                >
                  Create Olfactory Signature ✍️
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfumerRegister;
