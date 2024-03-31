import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import "../style/invoice.css";
import { PrinterOutlined, DeleteOutlined } from "@ant-design/icons";

const AdminOrder = () => {
  const componentRef = useRef();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [billpayment, setbillpayment] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [billdate, setbilldate] = useState("");
  const [date, setdate] = useState("");
  const [billcustomername, setbillcustomername] = useState("");
  const [billcustomerPhone, setbillcustomerPhone] = useState("");
  const [billtotal, setbilltotal] = useState(0);

  useEffect(() => {
    getAllOrders();
    // getallbills();
  }, []);

  // Get all order function

  const getAllOrders = async () => {
    try {
      const response = await axios.get("https://rest-backend-97ni.onrender.com/api/place/get-order");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching orders:", error);
    }
  };

  const deleteorder = async (orderId) => {
    try {
      await axios.delete(`https://rest-backend-97ni.onrender.com/api/place/delete-order/${orderId}`);
      // Fetch updated list of orders after deleting the bill
      getAllOrders();
      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order");
    }
  };

  // Print function

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setTotal(order.total);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setCustomerName("");
    setPhoneNumber("");
    setPaymentMode("");
  };

  // modal function for the invoice
  const handleOpenModal = async (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
    setCustomerName(billcustomername);
    setPhoneNumber(billcustomerPhone);
    setdate(billdate);
    setTotal(billtotal);
    setPaymentMode(billpayment);
  };

  // function for generating the bills
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        // eslint-disable-next-line
        const userId = decodedToken.userId;

        // Prepare bill data
        const billData = {
          CustomerName: customerName,
          CustomerNumber: phoneNumber,
          paymentMode: paymentMode,
          total: total,
          cartItems: selectedOrder.items,
          Date: date,
        };

        // Send request to create a new bill
        const response = await axios.post("https://rest-backend-97ni.onrender.com/api/bills/add-bills", billData);

        console.log(response.data);
        setbillcustomername(customerName);
        setbillcustomerPhone(phoneNumber);
        setbilldate(Date);
        setbilltotal(total);
        setbillpayment(paymentMode);

        handleCloseModal();

        message.success("Bill created successfully");
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      alert("Failed to create bill");
    }
  };

  return (
    <DefaultLayout>
      <h1 className="mb-5">Orders</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Items</th>
            <th>Price</th>
            <th>Total</th>
            <th style={{ width: "150px" }}>Generate Bills</th>
            <th>Print</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.user.name}</td>
              <td>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {i + 1}. {item.name}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {i + 1}. Rs. {item.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.total}</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  onClick={() => handleShowModal(order)}
                  className="mx-auto"
                >
                  Bills
                </Button>
              </td>
              <td>
                <PrinterOutlined onClick={() => handleOpenModal(order)} />
              </td>
              <td>
                <DeleteOutlined
                  className="delete-icon"
                  onClick={() => deleteorder(order._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} controlId="formGridCustomerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group as={Col} controlId="formGridPaymentMode">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Control
                as="select"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="">Select payment mode</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group as={Col} controlId="formGridTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control type="text" readOnly value={`$${total}`} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* INovice MOdal  */}

      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="invoice" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2 className="h2">Restaurant Name</h2>
                <p>Contact: 8849286008 | Anand Gujarat</p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name: <b>{customerName}</b>
                  <br />
                  Phone No: <b>{phoneNumber}</b>
                  <br />
                  Date: <b>{date.toString().substring(0, 10)}</b>
                  <br />
                  Payment Mode: <b>{paymentMode}</b>
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2 className="h2">Item</h2>
                      </td>
                      <td className="rate">
                        <h2 className="h2">Price</h2>
                      </td>
                      {/* <td className="rate">
                        <h2>total</h2>
                      </td> */}
                    </tr>
                    {selectedOrder &&
                      selectedOrder.items &&
                      selectedOrder.items.map((item, index) => (
                        <>
                          <tr key={index} className="service">
                            <td className="item">
                              <p>{item.name}</p>
                            </td>
                            <td className="item">
                              <p>Rs {item.price}</p>
                            </td>
                          </tr>
                        </>
                      ))}

                    <tr className="tabletitle">
                      <td className="Rate">
                        <h2 className="h1">Total</h2>
                      </td>
                      <td className="payment">
                        <h2 className="h1">
                          <b>Rs {total}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank You for your order!</strong> 10% GST application
                  on total amount. Please note that this is non refundable
                  amount for any assistance please write email
                  <b>help@gmail.com</b>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-items-end">
            <Button variant="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
};

export default AdminOrder;
