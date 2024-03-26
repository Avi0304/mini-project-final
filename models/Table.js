const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true,
        unique: true // Ensures uniqueness of table numbers
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Reserved'],
        default: 'Available'
    },
    date: {
        type: String, 
        required: true
    },
    time: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Tables = mongoose.model("Tables", tableSchema);
module.exports = Tables;
