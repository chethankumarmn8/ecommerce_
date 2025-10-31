import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col md={6}>
              <h1 className="display-4 mb-4 fw-bold">Crafting Scented Narratives</h1>
              <p className="lead fs-4 text-warning">Where Alchemy Meets Artistry in Modern Perfumery</p>
            </Col>
            <Col md={6}>
              <Image 
                src="https://img.freepik.com/premium-photo/perfume-laboratory-with-sage-aromatic-notes-generative-ia_209190-25969.jpg" // Updated image path
                fluid 
                rounded 
                className="shadow-lg"
                alt="Perfume laboratory"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 display-5 fw-normal border-bottom border-2 border-warning pb-3 mx-auto" style={{maxWidth: "600px"}}>
            Our Olfactory Philosophy
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm hover-shadow">
                <Card.Body>
                  <Card.Title className="text-warning">Innovative Scent Architecture</Card.Title>
                  <Card.Text>
                    Revolutionizing perfumery through molecular innovation while respecting classic techniques
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm hover-shadow">
                <Card.Body>
                  <Card.Title className="text-warning">Ethical Sourcing</Card.Title>
                  <Card.Text>
                    Sustainable farms and fair-trade cooperatives across 23 countries
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm hover-shadow">
                <Card.Body>
                  <Card.Title className="text-warning">Scent Personalization</Card.Title>
                  <Card.Text>
                    AI-assisted fragrance customization for unique scent profiles
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Statement */}
      <section className="bg-warning bg-opacity-10 py-5">
        <Container>
          <blockquote className="blockquote text-center">
            <p className="mb-4 fs-3 fst-italic">
              "To transform personal fragrance from mere accessory to profound self-expression"
            </p>
            <footer className="blockquote-footer mt-3 fs-5">
              CEO & Master Perfumer, Élise Dubois
            </footer>
          </blockquote>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 display-5 fw-normal border-bottom border-2 border-warning pb-3 mx-auto" style={{maxWidth: "600px"}}>
            Our Scented Journey
          </h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="p-4 border border-2 border-warning rounded-3">
                <div className="text-warning fs-2 fw-bold">2008</div>
                <h4>Parisian Beginnings</h4>
                <p>Boutique perfumery in Le Marais</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border border-2 border-warning rounded-3">
                <div className="text-warning fs-2 fw-bold">2014</div>
                <h4>Sustainable Practices</h4>
                <p>Biodegradable fragrance line launched</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border border-2 border-warning rounded-3">
                <div className="text-warning fs-2 fw-bold">2022</div>
                <h4>Global Recognition</h4>
                <p>IFRA Sustainability Prize</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sustainability Section */}
      <section className="bg-dark text-white py-5">
        <Container>
          <Row className="g-5 align-items-center">
            <Col md={6}>
              <Image 
                src="https://tse4.mm.bing.net/th?id=OIP.mxS8L5m7fIqWj2Dbt9pC3AHaE5&pid=Api&P=0&h=180" 
                fluid 
                rounded 
                className="shadow"
                alt="Sustainable ingredients"
              />
            </Col>
            <Col md={6}>
              <h2 className="mb-4 text-warning">Eco-Conscious Craftsmanship</h2>
              <ul className="list-unstyled fs-5">
                <li className="mb-3 border-bottom pb-2">100% Recyclable Packaging</li>
                <li className="mb-3 border-bottom pb-2">Carbon-Neutral Production</li>
                <li className="mb-3 border-bottom pb-2">Wildlife Conservation</li>
                <li className="pb-2">Waterless Formulation</li>
              </ul>
              
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 display-5 fw-normal border-bottom border-2 border-warning pb-3 mx-auto" style={{maxWidth: "600px"}}>
            The Nose Behind Scents
          </h2>
          <Row className="g-4">
            {[1, 2, 3].map((item) => (
              <Col md={4} key={item}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Img 
                    variant="top" 
                    src={`/path/to/perfumer-${item}.jpg`} 
                    className="rounded-circle w-50 mx-auto mt-4"
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fs-4">Dr. Marcus Wei</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">Chief Scent Architect</Card.Subtitle>
                    <Card.Text>PhD in Aroma Chemistry, 15+ years experience</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-warning py-5">
  <Container className="text-center">
    <h2 className="mb-5 display-6">Ready to Begin Your Scent Journey?</h2>
    <Link to="/marketplace"> {/* Link to the collections page */}
      <Button variant="dark" size="lg" className="mx-2 px-5 py-3 fw-bold">
        Discover Collections
      </Button>
    </Link>
    <Link to="/artisan-login"> {/* Link to the custom scent page */}
      <Button variant="outline-dark" size="lg" className="mx-2 px-5 py-3 fw-bold">
        Create Custom Scent
      </Button>
    </Link>
  </Container>
</section>
    </div>
  );
};

export default AboutUs;