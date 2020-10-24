var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
	res.header("Content-Type", "application/json");
	res.json(200,{
		status: "success",
	});
});

module.exports = router;
