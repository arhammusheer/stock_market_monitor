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
app.use((req, res, next) => {
	res.header("Content-Type", "application/json");
	next();
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGO_URL, {
		dbName: "spaceCowboys",
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("DB Connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.use("/", indexRouter);

expressOasGenerator.handleRequests();

module.exports = app;
