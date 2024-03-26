import React from "react";
import NavBar from "../components/NavBar";
import { MenuBtn } from "../components/MenuBtn";
import '../style/Home.css';
import AboutImg from '../utils/about-img.jpg';
import { Link } from "react-router-dom";
import { Photo } from '../components/Photo';
import { ContactUs } from '../components/ContactUs';
import Footer from "../components/Footer";



const Home = () => {
  return (
    <div>
      <NavBar>
        <div className="home-page">
          <header className="h-100 min-vh-100 d-flex align-items-center text-light shadow">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 d-flex d-sm-block flex-column align-items-center">
                    <h2 className="mb-0 text-black fw-bold">Welcome To</h2>
                    <h1 className="mb-5 text-black fw-bold text-center text-sm-start">Our Restaurant</h1>
                    <MenuBtn/>
                  </div>
                </div>
              </div>
          </header>
        </div>

        <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
                        <img src={AboutImg} className='img-fluid w-50' alt="about img" />
                    </div>
                    <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
                        <h2 className='fs-1 mb-5 text-uppercase fw-bold'>About Us</h2>
                        <p>Founded in [Year], [Restaurant Name] was born out of a shared love for food, hospitality, and community. </p>
                        <p className='mb-5'>Our founders, [Founder Names], envisioned a place where guests could indulge in delectable dishes crafted with care and enjoy warm, inviting hospitality in a welcoming atmosphere.</p>
                        <Link to="/about">
                            <button type='button' className='btn btn-outline-success btn-lg'>More About Us</button>
                        </Link>
                    </div>
                </div>
            </div>

          <Photo/>

         <ContactUs/>
       <Footer/>
      </NavBar>
     
    </div>
  );
};

export default Home;
