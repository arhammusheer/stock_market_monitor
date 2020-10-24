const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get("/", (req, res, next) => {
	res.status(200).json({
		status: "success",
	});
});

router.get("/dashboard", (req, res, next) => {
  fetch('http://spacecowboys.tech:3001').then(res => res.json()).then(json => {
    console.log(json)
    res.status(200).json({
    status: "success",
    prices: json
	});
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      status: "failure"
    })
  })
	
});

module.exports = router;
