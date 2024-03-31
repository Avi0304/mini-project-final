
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const { bgCyan } = require("colors");
require("colors");
const connectDb = require("./config/config");
//dotenv config
dotanv.config();
//db config
connectDb();
//rest object
const app = express();

//middlwares
app.use(cors({
  origin: ["https://mini-project-final-vert.vercel.app"],
  methods: ["POST", "GET", "DELETE"]
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/user", require("./routes/Auth"));
app.use("/api/table",require("./routes/TableRoutes"))
app.use("/api/cart",require("./routes/CartRoutes"))
app.use("/api/feedback",require("./routes/FeedbackRoutes"))
app.use("/api/place",require("./routes/OrderRoute"))
app.use("/api/bills",require("./routes/BillsRoute"))
app.use("/api",require("./routes/Paynow"));




//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});