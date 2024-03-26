const express = require('express');
const router = express.Router(); 
const { paynow } = require("../controller/paynowcontroller");

router.post("/create-checkout-session", paynow);


module.exports = router;
