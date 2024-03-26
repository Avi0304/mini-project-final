const express = require('express')
const {getCart, addCart,deletecartitem,deleteCart} = require('../controller/CartController')

const router = express.Router()

//MEthod -get  for getting all item ffrom the cart
router.get('/get-cart',getCart)

//MEthod -post  for adding item to cart
router.post('/add-cart',addCart)

//Method -delete for deleting the item from the cart
router.delete('/delete-cartitem/:itemId',deletecartitem)

//Method -delete for deleting  the cart
router.delete('/delete-cart/:cartId',deleteCart)

module.exports = router