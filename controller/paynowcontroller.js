const stripe = require("stripe")("sk_test_51OvDKmSJmccfK0PHIWidFMssidJ8dojs5gsCOtaxYQmM3IHtdUlx34g94NmJZ53Zb2PCOnJPLI0waM7KPerNhTw700KKUbsrz9");



const paynow = async (req, res) => {

    const {products} = req.body;
  
  
    const lineItems = products.map((product)=>({
      price_data:{
          currency:"inr",
          product_data:{
              name:product.name,
              images: [product.image]
          },
          unit_amount:product.price * 100,
      },
      quantity: 1,
  }));
  
const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:3000/sucess",
    cancel_url:"http://localhost:3000/cancel",
    billing_address_collection: 'auto', // Collect billing address
        shipping_address_collection: {
            allowed_countries: ["US"], // Allow shipping only to India
        },
    });

    // res.redirect(303, session.url);
    res.json({id:session.id})
 
  };

  
  module.exports = { paynow };