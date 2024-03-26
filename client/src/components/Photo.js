import React from "react";
import img1 from '../utils/img1.jpg';
import img2 from '../utils/img2.jpg';
import img3 from '../utils/img3.jpg';
import img4 from '../utils/img4.jpg';
import img5 from '../utils/img5.jpg';
import img6 from '../utils/img6.jpg';

export function Photo() {
    return (
        <div className="container py-5">
            <h2 className="text-center fs-1 mb-5 text-uppercase fw-bold">Gallery</h2>
            <div className="row">
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={img1} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={img2} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={img3} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={img4} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={img5} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={img6} className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}