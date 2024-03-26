import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response as JSON
        const data = await response.json();
        console.log("Response from server:", data);

        // Check if the response contains the token
        if (data.token) {
          // Save token to local storage
          localStorage.setItem("token", data.token);

          // Redirect to home page
          navigate("/admin");
          message.success("Login Successful");
        } else {
          message.error("Login Failed: " + data.message);
        }
      } else {
        // Handle non-successful response (status code not 2xx)
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="register">
      
      <div className="register-form">
      <h3 className="fs-2 mb-5 fw-bold text-center" style={{ color: 'rgb(0, 0, 90)' }}>Fill Out Below form to login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label center1 fw-bold fs-4">
              Email
            </label>
            <input
              type="email"
              className="form-control custom-width center1"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label center1 fw-bold fs-4">
              Password
            </label>
            <input
              type="password"
              className="form-control custom-width center1"
              id="password"
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
            Not a user? Please <Link to="/admin/register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
