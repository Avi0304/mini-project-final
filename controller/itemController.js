const itemModel = require("../models/itemModel");

// get items
const getItemController = async (req, res) => {
  try {
    const {category} = req.query;
    let query = {};
    if(category){
      query = {category}
    }
    const items = await itemModel.find(query);
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

// add items 

const addItemController = async(req, res) =>{
    try {
        const newItem = await itemModel(req.body)
        await newItem.save()
        res.status(201).send("Item add successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send("error",error)
    }
};

const editItemController = async (req, res) => {
  try {
    const { itemId } = req.params; 
    // console.log(itemId);
    await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });
    // console.log(req.body);
    res.status(201).json("Item updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error updating item: " + error.message);
  }
};


const deleteItemController = async (req, res) => {
  try {
    const itemId = req.params.id; 
    console.log(itemId);
    await itemModel.findOneAndDelete({ _id: itemId }); 
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error); 
  }
}


module.exports = {getItemController,addItemController, editItemController,deleteItemController}