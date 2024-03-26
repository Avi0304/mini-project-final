import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p> Whether you're joining us for a casual lunch, a romantic dinner, or a
        special celebration, our warm and welcoming ambiance, paired with
        impeccable service, guarantees an unforgettable dining experience</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" style={{textDecoration: "none", color: "white"}}>Home</Link></li>
              <li><Link to="/menu" style={{textDecoration: "none", color: "white"}}>Menu</Link></li>
              <li><Link to="/about" style={{textDecoration: "none", color: "white"}}>About</Link></li>
              <li><Link to="/book" style={{textDecoration: "none", color: "white"}}>Book Table</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>123 Main Street, Anand, India</p>
            <p>Email: info@example.com</p>
            <p>Phone: +91 8849286008</p>
          </Col>
        </Row>
        <hr className="my-4" />
        <p className="text-center">&copy; {new Date().getFullYear()} Restaurant. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
