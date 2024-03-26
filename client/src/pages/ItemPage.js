import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message } from "antd"; 

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    getallitems();
  }, []);

  // Get All items
  const getallitems = async () => {
    try {
      const { data } = await axios.get("/api/items/get-item");
      setItems(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Items
  const additem = async () => {
    try {
      await axios.post("/api/items/add-item", newItem);
      setNewItem({ name: "", price: "", category: "", image: "" });
      getallitems();
      message.success("Item added successfully");
    } catch (error) {
      console.error("error adding item:", error);
      message.error("something went wrong");
    }
  };

  // Delete Item
  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/items/delete-item/${itemId}`); // Use itemId._id
      // Refresh the item list after deletion
      getallitems();
      message.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("something went wrong");
    }
  };

  // Set Edit Item
  const setEditItemData = (item) => {
    setEditItem({ ...item, id: item._id }); // Ensure _id is set as id
  };

  // Update Item
  const updateItem = async () => {
    try {
      await axios.put(`/api/items/edit-item/${editItem.id}`, editItem); // Use editItem.id instead of editItem._id
      setEditItem({
        id: "",
        name: "",
        price: "",
        image: "",
        category: "",
      });
      getallitems();
      message.success("Item updated successfully");
    } catch (error) {
      console.error("Error while updating... ", error);
      message.error("something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <h1>Item List</h1>

      <button
        type="button"
        className="btn btn-primary add"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Item
      </button>

      {/* // Display list of items */}
      <table className="table">
  <thead>
    <tr>
    <th scope="col">Sr No</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item,index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td>
        <DeleteOutlined
              className="delete-icon"
              onClick={() => deleteItem(item._id)}
            />
          <EditOutlined
              onClick={() => setEditItemData(item)}
              data-bs-toggle="modal"
              data-bs-target="#editItemModal"
              className="edit-button"
            />
        </td>
      </tr>
    ))}
  </tbody>
</table>


     
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Items
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Price" className="form-label">
                  Price:
                </label>
                <input
                  type="text"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  placeholder="Enter item price"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Price" className="form-label">
                  cateogry:
                </label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  placeholder="Enter item category"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image:
                </label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                  placeholder="Enter item image URL"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={additem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Item Modal */}
      <div
        className="modal fade"
        id="editItemModal"
        tabIndex="-1"
        aria-labelledby="editItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editItemModalLabel">
                Edit Item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={editItem.price}
                    onChange={(e) =>
                      setEditItem({ ...editItem, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={editItem.image}
                    onChange={(e) =>
                      setEditItem({ ...editItem, image: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={editItem.category}
                    onChange={(e) =>
                      setEditItem({ ...editItem, category: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateItem}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ItemPage;