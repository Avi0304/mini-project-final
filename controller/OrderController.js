const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Order = require('../models/Order');
const Cart = require('../models/CartModel');
const user = require('../models/User');


const placeOrder = async (req, res) => {
  try {
      const { userId, items, total } = req.body;

      // Validate request body
      if (!userId || !items || !Array.isArray(items)) {
          return res.status(400).json({ error: 'Invalid request body' });
      }

      // Convert itemIds to ObjectId instances
      const itemIds = items.map(item => new ObjectId(item.itemId));

      // Create new order with userId and items
      const order = new Order({ user: userId, items: itemIds, total });
      await order.save();
      // console.log(order);
      
      // Respond with success message and order details
      res.status(200).json({ message: 'Order placed successfully', order });

  } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Failed to place order' });
  }
}



const getorder = async (req, res) => {
    try {
      const orders = await Order.find().populate('items', 'name price').populate({
        path: 'user',
        select: 'name', // Select the 'name' field from the User model
      });
      res.status(200).send(orders);
    } catch (error) {
      console.log("Error while fetching order details:", error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    }
  }


const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id; 
      console.log(orderId);
      await Order.findOneAndDelete({ _id: orderId }); 
      res.status(200).json({ message: 'order deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(400).send(error); 
    }
  }



module.exports = { placeOrder,getorder,deleteOrder };
