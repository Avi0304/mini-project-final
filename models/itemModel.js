const mongoose =  require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type:String,
        require: true
    },
    image: {
        type:String,
        require:true
    }
},{timeStamp: true}
);

const Items = mongoose.model("Items",itemSchema);
module.exports = Items