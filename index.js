// Main starting point of the application
require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

// DB Setup

mongoose.connect(
  `mongodb+srv://kabulzhan:${process.env.MONGODB_PASS}@cluster0.pnfqe.mongodb.net/test`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var corsOptions = {
  origin: "https://news-carcass.herokuapp.com/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// App Setup
app.options("*", cors(corsOptions));
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
