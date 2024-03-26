import React from 'react';
import { Link } from 'react-router-dom';
import '../style/success.css'

const Success = () => {
  return (
    <div className="success-container">
      <h4>Thanks for your order!</h4>
      <div className="tick-mark">&#10004;</div>
      <p>
      "We're delighted to have served you! Should you have any inquiries or feedback, feel free to reach out to us at info@restaurant.com. <br />Your satisfaction is our top priority."

      </p>
      <div className="button-container">
        <Link to="/" className="go-to-home-button">Go to Home</Link>
      </div>
    </div>
  );
};

export default Success;
