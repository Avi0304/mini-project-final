const mongoose =  require('mongoose');

const cartSchema = mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }],
    total: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;