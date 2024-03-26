const express = require('express')
const {getallfeedback,addFeedback,deleteFeedback} = require("../controller/FeedbackController")
const { route } = require('./CartRoutes')

const router = express.Router()

// ROUTE For Getting the Feedback
router.get('/get-feedback',getallfeedback)

//ROUTE For Adding the feedback
router.post('/add-feedback',addFeedback)

//ROUTE for deleting the feedback
router.delete('/delete-feedback/:id',deleteFeedback)

module.exports = router