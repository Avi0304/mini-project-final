const Feedback = require("../models/Feedback")

// method for getting all feedback 

const getallfeedback = async(req,res) => {
    try {
        const feedback = await Feedback.find()
        res.status(200).send(feedback)

    } catch (error) {
        console.error("Error while getting feedback: ",error)
    }
}

// Method for adding the Feedback 

const addFeedback = async(req,res) => {
    try {
        const newFeedback = await Feedback(req.body)
        await newFeedback.save()
        res.status(200).send("Feedback added Successfully....")
    } catch (error) {
        console.error("Error while adding the feeedback ", error)
    }
}

// MEthod for delete feedback 

const deleteFeedback = async(req,res) => {
    try {
        const feedbackid = req.params.id; 
      console.log(feedbackid);
      await Feedback.findOneAndDelete({ _id: feedbackid }); 
      res.status(200).json({ message: 'Feedback deleted successfully' });

    } catch (error) {
        console.error("Error while deleting the feeedback ", error) 
    }
}

module.exports = {getallfeedback,addFeedback,deleteFeedback}