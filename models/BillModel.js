const mongoose =  require('mongoose');

const billSchema = mongoose.Schema({
    CustomerName: {
        type:String,
        require:true
    },
    CustomerNumber: {
        type: Number,
        require: true
    },
    total: {
        type:Number,
        require: true
    },
    paymentMode: {
        type:String,
        require:true
    },
    cartItems :{
        type: Array,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{timeStamp: true}
);

const Bills = mongoose.model("Bills",billSchema);
module.exports = Bills