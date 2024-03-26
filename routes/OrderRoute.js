const express = require('express');
const router = express.Router(); 
const { placeOrder,getorder,deleteOrder } = require("../controller/OrderController");

router.post("/place-order", placeOrder);

router.get("/get-order", getorder);

router.delete("/delete-order/:id",deleteOrder )

module.exports = router;
