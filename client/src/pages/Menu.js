// Menu.js
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import "../style/Menu.css";
import axios from "axios";
import Bookbtn from "../components/Bookbtn";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    fetchCategories();
    fetchuserId(); // Fetch user ID when component mounts
  }, []);

  useEffect(() => {
    console.log("User ID State:", userid); // Log user ID state
  }, [userid]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "/api/items/get-item";
      if (category) {
        url += `?category=${category}`; // Add category query parameter if selected
      }

      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Error fetching items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/items/get-item");
      const categories = [...new Set(response.data.map((item) => item.category))];
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchuserId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        return userId;
      } else {
        console.log("Token not found in localStorage");
        return null;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const Addtocart = async (itemIds, userIds) => {
    try {
      const userId = await fetchuserId(); // Await the user ID fetch
      console.log("User ID:", userId);
      if (!userId) {
        // Check if the user is logged in
        message.error("Please login to add items to the cart.");
        return;
      }

      const response = await axios.post("/api/cart/add-cart", { items: itemIds, userId: userIds });
      console.log("Items added to cart", response.data);
      message.success("Item added to cart..");
    } catch (error) {
      console.error("Error while adding to cart: ", error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(category === selectedCategory ? "" : selectedCategory);
  };

  return (
    <>
      <NavBar Addtocart={Addtocart} userid={userid}/>
      <div className="menu-page">
        <header className="h-100 min-vh-100 d-flex align-items-center text-light shadow">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 d-flex d-sm-block flex-column align-items-center">
                <h1 className="mb-0 text-white fw-bold text-center text-sm-start">It's not just</h1>
                <h1 className="mb-0 text-white fw-bold text-center text-sm-start">Food, It's an </h1>
                <h1 className="mb-5 text-white fw-bold text-center text-sm-start">Experience</h1>
                <Bookbtn/>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="container mt-5">
        <h2 className="fw-bold text-center">Our Menu</h2>
        <div className="text-center mt-3">
          {/* Buttons to filter items by category */}
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-outline-primary ${category === "" ? "active" : ""}`}
              onClick={() => handleCategoryChange("")}
              style={{ marginRight: "10px" }}
            >
              All Categories
            </button>
            {categories.map((categoryItem) => (
              <button
                key={categoryItem}
                type="button"
                className={`btn btn-outline-primary ${category === categoryItem ? "active" : ""}`}
                onClick={() => handleCategoryChange(categoryItem)}
                style={{ marginRight: "10px" }}
              >
                {categoryItem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display items */}
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-center mt-5">{error}</div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            {items.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt="..."
                    style={{ maxHeight: "200px", border: "none", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: {item.price}</p>
                    <p className="card-text">Category: {item.category}</p>
                    <button className="btn btn-success" onClick={() => Addtocart([item._id], userid)}>
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Menu;
