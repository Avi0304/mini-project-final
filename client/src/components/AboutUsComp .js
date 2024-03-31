import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd"; 

const AboutUsComp = () => {

    // eslint-disable-next-line
    const [feedback, setfeedback] = useState([]);
    const [newfeedback, setnewfeedback] = useState({
      name: "",
      phone: "",
      message: "",
    });

    const getallreview = async () => {
        try {
          const { data } = await axios.get("api/feedback/get-feedback");
          setfeedback(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

      const addreview = async () => {
        try {
          await axios.post("https://rest-backend-97ni.onrender.com/api/feedback/add-feedback", newfeedback);
          setnewfeedback({ name: "",  phone: "",message: "" });
          getallreview();
          message.success("review added successfully");
        } catch (error) {
          console.error("error adding item:", error);
          message.error("something went wrong");
        }
      };

      useEffect(() => {
        getallreview();
      }, []);



  return (
    <section id="about-us">
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <p>
              Welcome to [Restaurant Name], where we strive to provide our customers with an exceptional dining experience. Our passion for food and commitment to quality make us stand out among the rest.
            </p>
            <p>
              At [Restaurant Name], we believe in using only the freshest ingredients sourced from local farmers and suppliers. Our talented chefs work tirelessly to create mouthwatering dishes that will tantalize your taste buds.
            </p>
            <p>
              Whether you're craving a hearty meal with friends and family or looking for a cozy spot for a romantic dinner, we have something for everyone. Sit back, relax, and let us take care of the rest.
            </p>
          </div>
        </div>
        <div className="container">
                <div className="container">
                    <div className='mt-3 mb-3 fw-bold text-black text-center text-uppercase large-text d-flex flex-column align-items-center justify-content-center'>
                        <h2>Feedback</h2>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" aria-describedby="nameHelp"
                             value={newfeedback.name}
                             onChange={(e) =>
                               setnewfeedback({ ...newfeedback, name: e.target.value })
                             } />
                            {/* <div id="nameHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone"  value={newfeedback.phone}
                             onChange={(e) =>
                               setnewfeedback({ ...newfeedback, phone: e.target.value })
                             }/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" for="exampleCheck1">Discription</label>
                            <input type="input" className="form-control" id="message" 
                             value={newfeedback.message}
                             onChange={(e) =>
                               setnewfeedback({ ...newfeedback, message: e.target.value })
                             }/>
                        </div>
                        <div className='text-center'>
                        <button
                type="button"
                className="btn btn-success"
                onClick={addreview}
              >
                Feedback
              </button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </section>
  );
};

export default AboutUsComp;