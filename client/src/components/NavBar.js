// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {  message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


// Define NavBar component
const NavBar = (props) => {
  // eslint-disable-next-line
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null); // Add user state

  // Fetch cart data and user data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(`/api/cart/get-cart?userId=${userId}`);
        const cartData = response.data;
        if (cartData) {
          const cartWithQuantity = cartData.items.map((item) => ({
            ...item,
            quantity: 1,
          }));
          setCart({ ...cartData, items: cartWithQuantity });
        }
      }
  
      // Set user state based on the response
    
      const userToken = localStorage.getItem("token");
      if (userToken ) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const userResponse = await axios.get(`/api/cart/get-cart?userId=${userId}`);
        const userData = userResponse.data;
        if (userData) {
          const username = userData.user.name; // Assuming 'name' is the field containing the username
          setUser(username);
          console.log(username);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Reset user state to null
    message.success("Logout Successfully..");
  };
  

  return (
    <div>
      <Navbar expand="lg" className="fixed-top bg-body-tertiary shadow">
        <Container className="d-flex align-items-center">
          <Navbar.Brand className="d-flex align-items-center">
            <div className="mr-3">
              <img
                src="https://www.freeiconspng.com/thumbs/restaurant-icon-png/restaurant-icon-png-plate-1.png"
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  border: "none",
                  marginRight: "10px",
                }}
              />
            </div>
            <Link to="/" className="navbar-brand text-success fw-semibold">
              Restaurant
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end w-100">
              <NavLink exact to="/" activeClassName="active" className="nav-link text-uppercase">
                Home
              </NavLink>
              <NavLink to="/menu" activeClassName="active" className="nav-link text-uppercase">
                Menu
              </NavLink>
              <NavLink to="/about" activeClassName="active" className="nav-link text-uppercase">
                About
              </NavLink>
              <NavLink to="/book" activeClassName="active" className="nav-link text-uppercase">
                Book Table
              </NavLink>
              <NavLink to="/cart" activeClassName="active" className="nav-link">
                <ShoppingCartOutlined />
              </NavLink>
              {user ? (
                <Nav.Link onClick={handleLogout}>
                  Welcome,  {user}
                </Nav.Link>
              ) : (
                <NavLink to="/loginweb" activeClassName="active" className="nav-link">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
};

export default NavBar;
