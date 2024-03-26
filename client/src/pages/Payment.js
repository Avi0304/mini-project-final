import React from 'react';
import QRcode from '../utils/payment.png';
import '../style/Payment.css'

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="payment-content">
        <h1 className="payment-heading">Payment</h1>
        <div className="qr-code-container">
          <img src={QRcode} alt="Payment QR Code" className="qr-code" />
        </div>
        <p className="payment-instruction">
          Scan the QR code to complete the payment. <br />
                  <strong>OR</strong> <br />
          
            
        </p>
      </div>
    </div>
  );
};

export default Payment;
