const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

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
	jwt.verify(
		req.headers.authorization,
		process.env.JWT_SERVER_SECRET,
		(err, decoded) => {
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
								message: "failed to fetch data",
								user: user,
							});
						});
				}
			});
		},
	);
});

router.get("/wallet", (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			status: "Unauthorized",
			message: "Token not sent",
		});
	}
	jwt.verify(
		req.headers.authorization,
		process.env.JWT_SERVER_SECRET,
		(err, decoded) => {
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
					if (user.wallet) {
						if (user.wallet.length == 0) {
							user.wallet = {
								USD: 0.0,
								BTC: 0.0,
								ETH: 0.0,
								DASH: 0.0,
								XZC: 0.0,
								NEO: 0.0,
								LTC: 0.0,
								BCH: 0.0,
							};
							User.findByIdAndUpdate(
								user._id,
								{ wallet: user.wallet },
								(err, newUser) => {
									if (newUser) {
										return res.status(200).json({
											status: "success",
											wallet: newUser.wallet,
										});
									}
								},
							);
						} else {
							return res.status(200).json({
								status: "success",
								wallet: user.wallet,
							});
						}
					} else {
						user.wallet = {
							USD: 0.0,
							BTC: 0.0,
							ETH: 0.0,
							DASH: 0.0,
							XZC: 0.0,
							NEO: 0.0,
							LTC: 0.0,
							BCH: 0.0,
						};
						User.findByIdAndUpdate(
							user._id,
							{ wallet: user.wallet },
							(err, newUser) => {
								if (newUser) {
									return res.status(200).json({
										status: "success",
										wallet: newUser.wallet,
									});
								}
							},
						);
					}
					
				}
			});
		},
	);
});

router.post("/transaction", (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			status: "Unauthorized",
			message: "No token",
		});
	}
	jwt.verify(
		req.headers.authorization,
		process.env.JWT_SERVER_SECRET,
		(err, decoded) => {
			if (err) {
				console.log(err);
				return res.status(401).json({
					status: "Unauthorized",
					message: "Invalid or Expired token",
				});
			}
			var errorMessage = [];
			var transaction = req.body;
			if (!transaction.type)
				errorMessage.push("Required field: type [buy/sell]");
			/*if (transaction.type !== "buy" || transaction.type !== "sell")
				errorMessage.push(
					"Invalid transaction type: Allowed types are buy/sell",
				);*/
			if (!transaction.currency)
				errorMessage.push("Required field: currency (crypto)");
			if (!transaction.amount) errorMessage.push("Required field: amount");
			if (errorMessage.length !== 0) {
				return res.status(400).json({
					status: "failed",
					error: errorMessage,
				});
			} else {
				fetch("http://spacecowboys.tech:3001")
					.then((res) => res.json())
					.then((json) => {
						console.log(json);
						var conversionRate =
							json[`BINANCE:${transaction.currency.toUpperCase()}USDT`].price;
						var finalPrice =
							parseFloat(conversionRate) * parseFloat(transaction.amount);

						const transac = {
							type: transaction.type,
							userId: decoded._id,
							initialCurrency: "USD",
							cryptoCurrency: transaction.currency,
							exchangeRate: conversionRate,
							amount: transaction.amount,
							convertedAmount: finalPrice,
						};

						Transaction.create(transac, (err, tran) => {
							if (err) {
								return res.status(500).json({
									status: "failed",
									message: "DB error",
								});
							}
							User.findById(decoded._id, (err, user) => {
								if (transaction.type == "buy") {
									user.wallet.USD = parseFloat(user.wallet.USD) - parseFloat(finalPrice);
									user.wallet[transaction.currency.toUpperCase()] +=
										transaction.amount;
								} 
								if (transaction.type == "sell") {
									user.wallet.USD = parseFloat(user.wallet.USD) + parseFloat(finalPrice);
									user.wallet[transaction.currency.toUpperCase()] -=
										parseFloat(transaction.amount);
								}
								
								user.save();
								return res.json({
									status: "success",
									wallet: user.wallet,
									transaction: tran,
								});
							});
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							status: "failed",
							message: "Transaction failed due to socket error",
						});
					});
			}
		},
	);
});

router.post("/login", (req, res, next) => {
	var user = req.body;
	if (user) {
		var errorMessage = [];
		if (!user.googleId) errorMessage.push("Required Field: googleId");
		if (!user.displayName) errorMessage.push("Required Field: displayName");
		if (!user.name.givenName)
			errorMessage.push("Required Field: name.givenName");
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
					Token = jwt.sign(
						{
							_id: user._id,
						},
						process.env.JWT_SERVER_SECRET,
					);
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
	} else {
		return res.status(400).json({
			status: "failed",
			message: "No userdata received",
		});
	}
});

module.exports = router;
