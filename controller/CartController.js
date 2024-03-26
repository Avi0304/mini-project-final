const Items = require('../models/itemModel');
const Cart = require('../models/CartModel');


// get all item in cart
const getCart = async (req, res) => {
  try {
      const userId = req.query.userId; // Extract user ID from query parameter
      // Find the cart and populate the 'items' field with item details
      const cart = await Cart.findOne({ user: userId }).populate('items').populate({
        path: 'user',
        select: 'name', // Select only the 'username' field from the user model
      });

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      res.json(cart);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}




// add items in cart 
const addCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Check if the items array is provided and is an array
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items format' });
    }

    // Find the cart associated with the user ID
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [], total: 0 });
    }

    // Initialize total price
    let total = cart.total || 0; // Use existing total if available

    // Iterate over each item ID in the array
    for (const itemId of items) {
      // Check if the item exists
      const item = await Items.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: `Item with ID ${itemId} not found` });
      }

      // Add the item price to the total
      if (item.price && !isNaN(item.price)) {
        total += parseFloat(item.price); // Sum up the item prices
        cart.items.push(item);
      } else {
        console.error(`Invalid price for item with ID ${itemId}`);
        return res.status(400).json({ error: `Invalid price for item with ID ${itemId}` });
      }
    }

    // Set the total price in the cart
    cart.total = total;

    // Save the cart
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




  // delete items from the cart 
  const deletecartitem = async (req, res) => {
    try {
      const itemId = req.params.itemId;
  
      // Find the cart
      const cart = await Cart.findOne();
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Remove the item from the cart
      cart.items = cart.items.filter(id => id.toString() !== itemId);
  
      // Update the total price
      const item = await Items.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      cart.total -= item.price;
  
      // Save the updated cart
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

    const deleteCart = async (req, res) => {
        try {
          // Extract cart ID from request parameters
          const { cartId } = req.params;
      
          // Find the cart by ID
          const cart = await Cart.findById(cartId);
      
          // Check if the cart exists
          if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
          }
      
          // Check if cart items exist and are not null
          if (!cart.items || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart items not found or empty' });
          }
      
          // Delete the cart
          await Cart.findByIdAndDelete(cartId);
      
          // Return success response
          return res.status(200).json({ message: 'Cart deleted successfully' });
        } catch (error) {
          // Handle errors
          return res.status(500).json({ error: error.message });
        }
      };
      
      
      
      
      

  

module.exports = {getCart, addCart,deletecartitem,deleteCart}