import React, { useState } from "react";
import { message } from "antd";
import "../style/LoginModal.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginModal = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rest-backend-97ni.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
          message.success("Login Successful");
        } else {
          message.error("Login Failed: " + data.message);
        }
      } else {
        throw new Error("Login Failed: Unexpected response from server");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-box"> {/* Apply login-box class */}
      <header className="header">Login</header> {/* Apply header class */}
      <div className="login-box-form">
      <h3 className="fs-2 mb-5 fw-bold text-center" style={{ color: 'rgb(0, 0, 90)' }}>Fill Out Below form to login</h3> {/* Apply login-box-form class */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 center1"> {/* Apply center1 class */}
          <label htmlFor="email" className="form-label center1 fw-bold fs-4">
              Email
            </label>
            <input
              type="email"
              className="form-control custom-width center1"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3 center1"> {/* Apply center1 class */}
          <label htmlFor="password" className="form-label center1 fw-bold fs-4">
              Password
            </label>
            <input
              type="password"
              className="form-control custom-width center1"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary center1 button">
            Login
          </button>
        </form>
        <div className="d-flex justify-content-between pt-4 fs-6">
          <p>
            Not a user? Please <Link to="/registerweb">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginModal;
