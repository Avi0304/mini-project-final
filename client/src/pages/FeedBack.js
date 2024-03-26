import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import Feedbacklist from "../components/Feedbacklist";
import { message } from "antd";

const FeedBack = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    getAllFeedback();
  }, []);

  const getAllFeedback = async () => {
    try {
      const { data } = await axios.get("/api/feedback/get-feedback");
      setFeedback(data);
    } catch (error) {
      console.error("Received error while getting feedback: ", error);
    }
  };

  const deleteFeedback = async (feedbackid) => {
    try {
      await axios.delete(`/api/feedback/delete-feedback/${feedbackid}`);
      getAllFeedback();
      message.success("Review Delete successfully.....");
    } catch (error) {
      console.error("Error while deleting the feedback", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="container">
        <h1>Reviews</h1>
        <div className="row">
          {feedback.map((feedbackItem) => (
            <div className="col-md-4" key={feedbackItem.id}>
              <Feedbacklist
                feedback={feedbackItem}
                onDelete={deleteFeedback}
              />
            </div>
          ))}
        </div>
      </div>
      
    </DefaultLayout>
  );
};

export default FeedBack;
