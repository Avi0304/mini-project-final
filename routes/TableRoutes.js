const express = require('express')
const router = express.Router()
const { getAlltable,addtable,deletetable } = require('../controller/tableController')

// method -get for all table details
router.get('/get-table',getAlltable)

// Method - post
router.post('/add-table', addtable)

// Method -delete
router.delete('/delete-table/:id',deletetable)

module.exports = router