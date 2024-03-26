import React from "react";
import { Link } from 'react-router-dom';

const Bookbtn =()=>{
    return (
        <div>
            <Link to="/book">
                <button type="button" className="btn btn-success btn-lg">Book Table</button>
            </Link>
        </div>
    )
}


export default Bookbtn; 