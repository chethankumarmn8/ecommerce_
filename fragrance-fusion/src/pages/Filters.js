import React from "react";
import { Card, Form } from "react-bootstrap"; // Added Card

const Filters = ({ filters, setFilters }) => (
  <Card className="shadow-sm">
    <Card.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">All Categories</option>
            <option>Jewelry</option>
            <option>Apparel</option>
            <option>Home Decor</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price Range</Form.Label>
          <Form.Range
            min={0}
            max={1000}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: e.target.value,
              }))
            }
          />
          <div className="d-flex justify-content-between">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
);

export default Filters;
