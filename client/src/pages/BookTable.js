import React from "react";
import NavBar from "../components/NavBar";
import "../style/BookTable.css";
import BookTableComp from "../components/BookTableComp";
import Footer from "../components/Footer";

const BookTable = () => {
  return (
    <>
      <NavBar />
      <div className="booktable">
        <header className="mt-5">
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <h1 className="text-light">Book Table</h1>
          </div>
        </header>
        <div className="mb-4">

        <BookTableComp></BookTableComp>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default BookTable;