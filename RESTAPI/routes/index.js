const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* GET home page. */
router.get("/", (req, res, next) => {
	res.status(200).json({
		status: "success",
	});
});

router.get("/dashboard", (req, res, next) => {
  if (!req.headers.authorization) {
		return res.status(401).json({
			status: "Unauthorized",
			message: "Token not sent",
		});
	}
	jwt.verify(req.headers.authorization, process.env.  JWT_SERVER_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: "Unauthorized",
				message: "Invalid or Expired token",
			});
		}
    User.findById(decoded._id, (err, user) => {
      if (err) {
        return res.status(401).json({
					status: "Unauthorized",
					message: "User not found",
				});
      }
      if (user) {
        fetch("http://spacecowboys.tech:3001")
					.then((res) => res.json())
					.then((json) => {
						console.log(json);
						res.status(200).json({
              status: "success",
              user: user,
							prices: json,
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
              status: "failed",
              message:"failed to fetch data",
              user: user
						});
					});
      }
    });
	});
});

router.post("/login", (req, res, next) => {
	var user = req.body;
	var errorMessage = [];
	if (!user.googleId) errorMessage.push("Required Field: googleId");
	if (!user.displayName) errorMessage.push("Required Field: displayName");
	if (!user.name.givenName) errorMessage.push("Required Field: name.givenName");
	if (!user.name.familyName)
		errorMessage.push("Required Field: name.familyName");
	if (!user.email) errorMessage.push("Required Field: email");
	if (!user.pictureUrl) errorMessage.push("Required Field: pictureUrl");
	if (errorMessage.length !== 0) {
		return res.status(400).json({
			status: "failed",
			error: errorMessage,
		});
	}
	User.findOrCreate(
		{
			googleId: user.id,
			displayName: user.displayName,
			firstName: user.name.givenName,
			lastName: user.name.familyName,
			email: user.email,
			pictureUrl: user.pictureUrl,
		},
		(err, user) => {
			if (user) {
        Token = jwt.sign({
          _id: user._id
        }, process.env.JWT_SERVER_SECRET);
				return res.status(200).json({
					status: "success",
					token: Token,
				});
			}
			if (err) {
				return res.status(500).json({
					status: "failed",
					reason: "A DB error has occured",
					error: err,
				});
			}
		},
	);
});

module.exports = router;
