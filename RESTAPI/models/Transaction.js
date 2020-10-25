var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var TransactionSchema = new Schema({
	type: String,
	userId: SchemaTypes.ObjectId,
	initialCurrency: String,
    cryptoCurrency: String,
    exchangeRate: String,
	amount: String,
	convertedAmount: String,
});

global.TransactionSchema =
	global.TransactionSchema || mongoose.model("Transaction", TransactionSchema);
module.exports = global.TransactionSchema;
