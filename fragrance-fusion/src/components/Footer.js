import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer bg-dark text-white">
      <Container>
        <Row className="g-4 footer-content">
          {/* Customer Service Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Customer Service</h5>
            <ul className="footer-links">
              <li>
                <a href="/customer-service">Customer Service</a>
              </li>
              <li>
                <a href="/track-order">Track Your Order</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/returns">Returns & Refunds</a>
              </li>
            </ul>
          </Col>

          {/* Discover Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Discover</h5>
            <ul className="footer-links">
              <li>
                <a href="/fragrance-guide">Fragrance Guide</a>
              </li>
              <li>
                <a href="/about">Our Brand Story</a>
              </li>
              <li>
                <a href="/blog">Perfume Journal</a>
              </li>
              <li>
                <a href="/new-arrivals">New Arrivals</a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Maison Fragrance</h5>
            <div className="contact-info">
              <p>FragranceFusion Headquarters</p>
              <p>72 Rue du Parfumeur</p>
              <p>75001 Paris, France</p>
              <div className="business-hours mt-3">
                <p>Mon-Fri: 10AM - 7PM</p>
                <p>Sat: 11AM - 5PM</p>
              </div>
            </div>
          </Col>

          {/* Newsletter Section */}
          <Col md={3}>
            <h5 className="footer-title mb-4">Olfactory Newsletter</h5>
            <Form className="newsletter-form">
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email for scent stories"
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="gold" className="w-100">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Legal Section */}
        <Row className="legal-section mt-5 pt-4">
          <Col className="text-center">
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sustainability">Sustainability</a>
              <a href="/wholesale">Wholesale Inquiries</a>
            </div>
            <div className="copyright mt-3">
              <p>© {new Date().getFullYear()} FragranceFusion Parfums</p>
              <p className="tagline">
                Crafting Signature Scents & Bespoke Fragrance Experiences
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;