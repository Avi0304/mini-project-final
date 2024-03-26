import React from "react";
import Contactimg from "../utils/ContactUs.avif";

export function ContactUs() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <h2 className="fs-1 mb-5 text-uppercase fw-bold">Where to Find Us</h2>
          <p>123 Main Street Anand, Gujarat, 388001 India</p>

          <h4 className="fs-1 mt-5 mb-5 text-uppercase fw-bold">Opening Hours</h4>
          <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>

          <h4 className="fs-1 mt-5 mb-5 text-uppercase fw-bold">Phone</h4>
          <p >Main: +91 8849286008 </p>
          <p >Customer Service:+91 7046133677</p>
        </div>

        <div className="col-lg-6 d-flex justify-content-center d-none d-lg-flex">
          <img src={Contactimg} className="img-fluid w-53" alt="about img" />
        </div>
      </div>
    </div>
  );
}
