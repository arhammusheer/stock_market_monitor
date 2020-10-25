var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
require("mongoose-double")(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var walletSchema = new Schema({
	USD: SchemaTypes.Double,
	BTC: SchemaTypes.Double,
	ETH: SchemaTypes.Double,
	DASH: SchemaTypes.Double,
	XZC: SchemaTypes.Double,
	NEO: SchemaTypes.Double,
	LTC: SchemaTypes.Double,
	BCH: SchemaTypes.Double,
});

var UserSchema = new Schema({
	displayName: String,
	firstName: String,
	lastName: String,
	googleId: String,
	email: String,
	pictureUrl: String,
	wallet: walletSchema,
});

UserSchema.plugin(findOrCreate);

global.UserSchema = global.UserSchema || mongoose.model("User", UserSchema);
module.exports = global.UserSchema;
