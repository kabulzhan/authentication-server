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

// App Setup
app.options("*", cors());
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
