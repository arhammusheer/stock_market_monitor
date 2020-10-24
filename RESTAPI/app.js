require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressOasGenerator = require("express-oas-generator");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");

const app = express();
expressOasGenerator.handleResponses(app, {});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", indexRouter);

expressOasGenerator.handleRequests();

module.exports = app;
