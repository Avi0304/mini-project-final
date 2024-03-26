import React from "react";
import NavBar from '../components/NavBar';
import "../style/About.css";
import AboutUsComp from "../components/AboutUsComp ";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="aboutus">
        <header className="mt-5">
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <h1 className="text-light">About us</h1>
          </div>
        </header>
      </div>

      <div><h2 className="mt-3 mb-3 fw-bold text-black text-center text-uppercase large-text">ABOUT US</h2></div>
      <div className="mb-4">
      <AboutUsComp></AboutUsComp>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;