import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("perfumerToken");
        if (!token) {
          setError("Authentication required. Please login.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/products/my-products",
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000, // 10 seconds timeout
          }
        );
        setProducts(response.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch products";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("perfumerToken"); // Fixed token key
      if (!token) {
        setError("Authentication required. Please login.");
        return;
      }

      await axios.delete(
        `http://localhost:8080/api/products/delete/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete product";
      alert(errorMessage);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error)
    return (
      <div className="container p-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="container p-4">
      <h2 className="mb-4">My Fragrance Creations</h2>
      {products.length === 0 ? (
        <Alert variant="info" className="rounded-4">
          No fragrances created yet. <Link to="/artisan/dashboard/add-product">Craft your first scent!</Link>
        </Alert>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm rounded-4 border-0">
                <div className="card-img-top" style={{ height: "250px", overflow: "hidden" }}>
                  {product.imageData?.length > 0 ? (
                    <div id={`carousel-${product.id}`} className="carousel slide h-100">
                      <div className="carousel-inner h-100">
                        {product.imageData.map((image, index) => (
                          <div
                            className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}
                            key={index}
                          >
                            <img
                              src={image}
                              className="d-block w-100 h-100"
                              alt={`${product.name} ${index + 1}`}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                      {product.imageData.length > 1 && (
                        <>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel-${product.id}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon"></span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel-${product.id}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon"></span>
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                      <i className="bi bi-image fs-1"></i>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge rounded-pill bg-primary">
                      {product.fragranceType}
                    </span>
                    <span className="badge rounded-pill bg-success">
                      <i className="bi bi-leaf me-1"></i>
                      {product.sustainabilityScore}/10
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <span className="text-secondary">Price: </span>
                      <span className="h5 text-dark">₹{product.price}</span>
                    </div>
                    <div>
                      <span className="text-secondary">Stock: </span>
                      <span className={`h5 ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link
                      to={`/artisan/dashboard/edit-product/${product.id}`} // Updated route
                      className="btn btn-outline-primary rounded-3"
                    >
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Formula
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-outline-danger rounded-3"
                    >
                      <i className="bi bi-trash3 me-2"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
