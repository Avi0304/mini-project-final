import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

const AdminBookTable = () => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    getAllTable();
  }, []);

  // Get all table details
  const getAllTable = async () => {
    try {
      const { data } = await axios.get("/api/table/get-table");
      setTable(data);
      console.log(data);
    } catch (error) {
      console.error("Error While Getting All tables: ", error);
    }
  };

  //delete table details
  const deleteTable = async (itemtable) => {
    try {
      await axios.delete(`/api/table/delete-table/${itemtable}`);
      // Refresh the item list after deletion
      getAllTable();
      message.success("Table deleted successfully");
    } catch (error) {
      console.error("Error deleting Table:", error);
      message.error("something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <h1 className="fw-bold text-black large-text">Book Table</h1>

      {/* Display table of tables */}
      <table className="table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Customer Name</th>
            <th>Table Number</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {table.map((tableItem, index) => (
            <tr key={tableItem.id}>
              <td>{index + 1}</td>
              <td>{tableItem.name}</td>
              <td>{tableItem.tableNumber}</td>
              <td>{tableItem.description}</td>
              <td>{tableItem.capacity}</td>
              <td>
                <DeleteOutlined
                  className="delete-icon"
                  onClick={() => deleteTable(tableItem._id)} // Corrected here
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultLayout>
  );
};

export default AdminBookTable;