import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const EditProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    fragranceType: "",
    stock: 0,
    keyIngredients: "",
    sustainabilityScore: 0,
    images: [],
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const token = localStorage.getItem("perfumerToken");

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
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          fragranceType: product.fragranceType,
          stock: product.stock,
          keyIngredients: product.keyIngredients,
          sustainabilityScore: product.sustainabilityScore,
          images: [],
        });
        setExistingImages(product.imageData || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (files.some((file) => file.size > MAX_FILE_SIZE)) {
      alert("Each file must be smaller than 5MB");
      return;
    }

    if (files.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") {
        data.append(key, value);
      }
    });

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await axios.put(
        `http://localhost:8080/api/products/update/${productId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product updated successfully!");
      navigate("/artisan/dashboard/products");
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Error updating product");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg rounded-4 p-4">
        <h2 className="text-center mb-4">Edit Product</h2>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="productCategory">
                <Form.Label>Fragrance Type</Form.Label>
                <Form.Select
                  name="fragranceType"
                  value={formData.fragranceType}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                >
                  <option value="">-- Select Fragrance Type --</option>
                  {categoryOptions.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="productPrice">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="productStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="keyIngredients">
                <Form.Label>Key Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  name="keyIngredients"
                  value={formData.keyIngredients}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="sustainabilityScore">
                <Form.Label>Sustainability Score (1-10)</Form.Label>
                <Form.Control
                  type="number"
                  name="sustainabilityScore"
                  value={formData.sustainabilityScore}
                  onChange={handleInputChange}
                  className="form-control-lg"
                  min={1}
                  max={10}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="productImages">
            <Form.Label>Upload New Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="form-control-lg"
            />
          </Form.Group>

          {imagePreviews.length > 0 && (
            <>
              <Form.Label>New Image Previews</Form.Label>
              <Row className="mb-3">
                {imagePreviews.map((preview, index) => (
                  <Col key={index} xs={6} md={3}>
                    <Card className="mb-3 border-0">
                      <Card.Img
                        src={preview}
                        className="img-fluid img-thumbnail"
                        alt={`preview-${index}`}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {existingImages.length > 0 && (
            <>
              <Form.Label>Existing Images</Form.Label>
              <Row className="mb-3">
                {existingImages.map((image, index) => (
                  <Col key={index} xs={6} md={3}>
                    <Card className="mb-3 border-0">
                      <Card.Img
                        src={image}
                        className="img-fluid img-thumbnail"
                        alt={`existing-${index}`}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          <div className="text-center mt-4">
            <Button
              variant="success"
              type="submit"
              size="lg"
              className="px-5 py-2 rounded-4"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProductForm;
