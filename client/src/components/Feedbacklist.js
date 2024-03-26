import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

const Feedbacklist = ({ feedback, onDelete }) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem", padding: "20px", marginBottom: "20px",  backgroundColor: "black", color: "white"}}>
        <div className="card-body">
          <h5 className="card-title"><b>Name: </b>{feedback.name}</h5>
          <p className="card-text fs-6">
            <b>Phone Number: </b> {feedback.phone}
            <br />
            <b>Message: </b> {feedback.message}
          </p>
          
          {onDelete && (
            <DeleteOutlined
              className="delete-icon"
              onClick={() => onDelete(feedback._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedbacklist;
