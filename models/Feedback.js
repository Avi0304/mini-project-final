const mongoose =  require('mongoose');

const FeedbackSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    phone: {
        type: Number,
        require: true
    },
    message: {
        type:String,
        require: true
    },
    
},{timeStamp: true}
);

const Feedback = mongoose.model("Feedback",FeedbackSchema);
module.exports = Feedback