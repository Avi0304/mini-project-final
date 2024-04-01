import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import { jwtDecode } from "jwt-decode"; // Assuming jwt-decode is used to decode JWT tokens
import { message } from "antd"; // Assuming antd message component is used for notifications
import { loadStripe } from "@stripe/stripe-js";
import NavBar from "../components/NavBar";
import { DeleteOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import "../style/Shoppingcart.css";

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placeOrderClicked, setPlaceOrderClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch cart data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(`https://rest-backend-97ni.onrender.com/api/cart/get-cart?userId=${userId}`);
        const cartData = response.data;
        if (cartData) {
          // Add quantity property to each item
          const cartWithQuantity = cartData.items.map((item) => ({
            ...item,
            quantity: 1, // Set the default quantity to 1
          }));
          setCart({ ...cartData, items: cartWithQuantity });
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    }
  };

  // Function to update shopping cart
  const updateShoppingCart = async () => {
    fetchData();
  };

  // Function to handle cart click
  // const handleCartClick = async () => {
  //   try {
  //     await updateShoppingCart();
  //     // await fetchData();
  //     //   setShowModal(true);
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  // Function to handle place order
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`https://rest-backend-97ni.onrender.com/api/cart/get-cart?userId=${userId}`);
        const cartData = response.data;

        if (cartData && cartData.items && cartData.items.length > 0) {
          const items = cartData.items.map((item) => ({
            itemId: item._id,
            name: item.name,
            price: item.price,
          }));

          const totalPrice = cartData.items.reduce(
            (acc, item) => acc + item.price,
            0
          );

          // Send the order data to the server
          const orderResponse = await axios.post("https://rest-backend-97ni.onrender.com/api/place/place-order", {
            userId,
            items,
            total: totalPrice,
          });

          console.log("Order response:", orderResponse.data);

          // Check if the order was successfully placed
          if (orderResponse.status === 200) {
           
            // setCart((prevCart) => ({
            //   ...prevCart,
            //   items: [],
            // }));

            setOrderPlaced(true);
            setPlaceOrderClicked(true);
            message.success("Order placed successfully.");
          } else {
            message.error("Failed to place order.");
          }
        } else {
          message.error("Error: Cart is empty.");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  const handlePayNow = async () => {
    try {
      await updateShoppingCart();
      const stripe = await loadStripe(
        "pk_test_51OvDKmSJmccfK0PHXAUm9rqPR7fMfikzFspJq7L4eGEsmQ4lNzWdD66LQ0Q7W1N7bfCCt0VJpzNFYShm18Tgn1iO00qcgwpgpZ"
      );
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log("Fetching cart data for userId:", userId);
        const response = await axios.get(`https://rest-backend-97ni.onrender.com/api/cart/get-cart?userId=${userId}`);
        console.log("Cart data response:", response.data);
        const cartData = response.data;

        if (cartData && cartData.items && cartData.items.length > 0) {
          const body = {
            products: cartData.items.map((item) => ({
              name: item.name,
              price: item.price,
              image: item.image
            })),
          };

          const headers = {
            "Content-Type": "application/json",
          };

          console.log("Sending checkout session request with body:", body);
          const checkoutResponse = await fetch(
            "https://rest-backend-97ni.onrender.com/api/create-checkout-session",
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify(body),
            }
          );

          const session = await checkoutResponse.json();
          console.log("Checkout session:", session);

          const result = stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (!result.error) {
            // Once payment is successful, delete the cart
            await axios.delete(`https://rest-backend-97ni.onrender.com/api/cart/delete-cart/${cartData._id}`);
            setCart(null); 
          }

          if (!result.error) {
            setCart(null); // Reset cart after successful payment
          }

          if (result.error) {
            console.log(result.error);
          }
        } else {
          console.error("Cart is empty.");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
  // Function to handle quantity change for a specific item
  const handleQuantityChange = (itemId, quantity) => {
    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);

    // If the item is found in the cart
    if (itemIndex !== -1) {
      // Create a copy of the cart
      const updatedCart = { ...cart };
      // Create a copy of the item with updated quantity
      const updatedItem = {
        ...updatedCart.items[itemIndex],
        quantity: parseInt(quantity, 10),
      };
      // Update the item in the copied cart
      updatedCart.items[itemIndex] = updatedItem;
      // Update the cart state with the modified cart
      setCart(updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`https://rest-backend-97ni.onrender.com/api/cart/delete-cartitem/${itemId}`); // Use itemId._id
      // Refresh the item list after deletion
      updateShoppingCart();
      message.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="shopping-cart mb-5">
          <h1 className="mb-3">Shopping Cart</h1>
          {cart ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                  <th>Image</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>action</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.itemId}>
                      <td>
                        <img src={item.image} alt={item.name} style={{ width: '100px', border: "none", maxHeight: '75px'}}/>
                      </td>
                      <td>{item.name}</td>
                      {/* <td>${item.price}</td> */}
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.itemId, e.target.value)
                          }
                          key={item.itemId} // Ensure each input field has a unique key
                        />
                      </td>
                      <td>
                        {" "}
                        <DeleteOutlined
                          className="delete-icon"
                          onClick={() => deleteItem(item._id)}
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {!orderPlaced && (
                <p className="text-end fw-bold ml-auto fs-6" style={{marginTop: "11px", marginRight: "10px"}}>Total: ${calculateTotalPrice().toFixed(2)}</p>
              )}
            </>
          ) : (
            <p>No items in the cart</p>
          )}
          <div className="buttons">
          
            {!orderPlaced &&
              !placeOrderClicked && ( // Render Place Order button only if Place Order button is not clicked
                <button onClick={handlePlaceOrder} className="btn btn-success">
                  Place Order
                </button>
              )}
            {/* Pay Now Button */}
            <button className="btn btn-primary" onClick={handlePayNow}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <div>
      <Footer/>
      </div>
    </>
  );
};

export default ShoppingCart;
