// AddProductForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fragranceType: "",
    price: "",
    stock: "",
    keyIngredients: "",
    sustainabilityScore: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("perfumerToken");
  const navigate = useNavigate();

  const categoryOptions = [
    "Floral",
    "Oriental",
    "Woody",
    "Fresh",
    "Citrus",
    "Chypre",
    "Gourmand",
    "Aquatic",
    "Leather",
  ];

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/artisan-login");
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.fragranceType)
      newErrors.fragranceType = "Fragrance Type is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.stock || formData.stock <= 0)
      newErrors.stock = "Valid stock quantity is required";
    if (!formData.keyIngredients.trim())
      newErrors.keyIngredients = "Key ingredients are required";
    if (
      !formData.sustainabilityScore ||
      formData.sustainabilityScore < 1 ||
      formData.sustainabilityScore > 10
    )
      newErrors.sustainabilityScore = "Sustainability score must be between 1-10";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const MAX_IMAGES = 4;
    const imageErrors = {};

    if (files.length > MAX_IMAGES) {
      imageErrors.images = `Maximum ${MAX_IMAGES} images allowed`;
    }

    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      imageErrors.images = "Each image must be smaller than 5MB";
    }

    if (Object.keys(imageErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...imageErrors }));
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && value !== "") data.append(key, value);
    });

    formData.images.forEach((image) => data.append("images", image));

    try {
      await axios.post("http://localhost:8080/api/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      navigate("/artisan/dashboard/products");
    } catch (error) {
      setErrors({
        server:
          error.response?.data?.message ||
          "Failed to add product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-white border-bottom py-4">
          <h2 className="h4 fw-semibold mb-0 text-center text-primary">
            Add New Product
          </h2>
        </div>
        <div className="card-body px-4 py-5">
          {errors.server && (
            <div className="alert alert-danger" role="alert">
              {errors.server}
            </div>
          )}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name && "is-invalid"}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Fragrance Type</label>
                <select
                  className={`form-select ${errors.fragranceType && "is-invalid"}`}
                  name="fragranceType"
                  value={formData.fragranceType}
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  {categoryOptions.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.fragranceType && (
                  <div className="invalid-feedback">{errors.fragranceType}</div>
                )}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  className={`form-control ${errors.price && "is-invalid"}`}
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0.01"
                  step="0.01"
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className={`form-control ${errors.stock && "is-invalid"}`}
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="1"
                />
                {errors.stock && (
                  <div className="invalid-feedback">{errors.stock}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">Sustainability Score (1-10)</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.sustainabilityScore && "is-invalid"
                  }`}
                  name="sustainabilityScore"
                  value={formData.sustainabilityScore}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  step="0.1"
                />
                {errors.sustainabilityScore && (
                  <div className="invalid-feedback">{errors.sustainabilityScore}</div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Product Description</label>
              <textarea
                className={`form-control ${errors.description && "is-invalid"}`}
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Key Ingredients</label>
              <input
                type="text"
                className={`form-control ${errors.keyIngredients && "is-invalid"}`}
                name="keyIngredients"
                placeholder="e.g., Bergamot, Sandalwood, Jasmine"
                value={formData.keyIngredients}
                onChange={handleInputChange}
              />
              {errors.keyIngredients && (
                <div className="invalid-feedback">{errors.keyIngredients}</div>
              )}
            </div>

            <div className="mb-5">
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                className={`form-control ${errors.images && "is-invalid"}`}
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {errors.images && (
                <div className="invalid-feedback d-block">{errors.images}</div>
              )}
              <div className="form-text">Max 4 images. Max size: 5MB each.</div>

              {imagePreviews.length > 0 && (
                <div className="row row-cols-2 row-cols-md-4 g-3 mt-3">
                  {imagePreviews.map((src, index) => (
                    <div className="col" key={index}>
                      <div className="ratio ratio-1x1">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="rounded border object-fit-cover w-100 h-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
