const express = require('express')
const {addbills,getbills,deletebills} = require('../controller/BillsController')

const router = express.Router()



router.post('/add-bills',addbills)

router.get('/get-bills',getbills)

router.delete('/delete-bills/:id',deletebills)


module.exports = router