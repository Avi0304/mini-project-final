const TableModel = require('../models/Table');

//get table
const getAlltable = async (req, res) => {
    try {
      const tables = await TableModel.find();
      res.status(200).send(tables);
    } catch (error) {
      console.log(error);
    }
  };

// add table

const addtable = async (req, res) => {
  try {
      const { name, capacity, description, status, date, time } = req.body;

      // Find the maximum table number in the database
      const maxTable = await TableModel.findOne({}, {}, { sort: { 'tableNumber' : -1 } });

      // Calculate the next table number
      const nextTableNumber = maxTable ? maxTable.tableNumber + 1 : 1;

      // Create a new table entry with the provided name, date, time, and the calculated table number
      const table = new TableModel({
          name,
          tableNumber: nextTableNumber,
          capacity,
          description,
          status: status || 'Available', // Set default status if not provided
          date,
          time
      });

      await table.save();
      res.status(201).json(table);
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
  }
};




const deletetable = async (req, res) => {
    try {
      const tableId = req.params.id; 
      console.log(tableId);
      await TableModel.findOneAndDelete({ _id: tableId }); 
      res.status(200).json({ message: 'Table Booking deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(400).send(error); 
    }
  }

module.exports = {getAlltable,addtable,deletetable}