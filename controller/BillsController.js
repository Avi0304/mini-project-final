const billsModel = require("../models/BillModel");

const addbills = async (req, res) => {
  try {
    const newBills = new billsModel(req.body);
    await newBills.save();
    res.status(200).send("Bill created successfully...");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const getbills = async(req,res) => {
    try {
        const bills = await billsModel.find()
        res.status(200).send(bills)

    } catch (error) {
        console.error("Error while getting bills: ",error)
    }
}

const deletebills = async (req, res) => {
  try {
    const billId = req.params.id; 
    console.log(billId);
    await billsModel.findOneAndDelete({ _id: billId }); 
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error); 
  }
}

module.exports = { addbills,getbills,deletebills };
