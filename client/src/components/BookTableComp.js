import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd"; 

function BookTableComp() {

    // eslint-disable-next-line
    const [table, settable] = useState([]);
    const [newtable, setnewtable] = useState({
      name: "",
      capacity: "",
      description: "",
      date: "",
      time: ""
    });

    const getalltable = async () => {
        try {
          const { data } = await axios.get("/api/table/get-table");
          settable(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

    const addtable = async () => {
        try {
          await axios.post("/api/table/add-table", newtable);
          setnewtable({ name: "", capacity: "", description: "", date: "", time: "" });
          getalltable();
          message.success("book table added successfully");
        } catch (error) {
          console.error("error adding item:", error);
          message.error("something went wrong");
        }
      };

      useEffect(() => {
        getalltable();
      }, []);

    return (
        <>
            <div className="container">
                <div className="container">
                    <div className='mt-3 mb-3 fw-bold text-black text-center text-uppercase large-text d-flex flex-column align-items-center justify-content-center'>
                        <h2>Book table</h2>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" aria-describedby="nameHelp" 
                            value={newtable.name}
                  onChange={(e) =>
                    setnewtable({ ...newtable, name: e.target.value })
                  }/>
                            {/* <div id="nameHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Capacity</label>
                            <input type="number" className="form-control" id="capacity" value={newtable.capacity}
                  onChange={(e) =>
                    setnewtable({ ...newtable, capacity: e.target.value })
                  }/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" value={newtable.description}
                  onChange={(e) =>
                    setnewtable({ ...newtable, description: e.target.value })
                  }/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input type="date" className="form-control" id="date" value={newtable.date}
                  onChange={(e) =>
                    setnewtable({ ...newtable, date: e.target.value })
                  }/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">Time</label>
                            <input type="time" className="form-control" id="time" value={newtable.time}
                  onChange={(e) =>
                    setnewtable({ ...newtable, time: e.target.value })
                  }/>
                        </div>
                       <div className="text-center">
                       <button
                type="button"
                className="btn btn-success"
                onClick={addtable}
              >
                Book
              </button>
                       </div>
                    </form>
                </div>
            </div>
        </> 
    )
}

export default BookTableComp;
