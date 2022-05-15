const { Decimal128 } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

recipeSchema = new Schema( {
	
	name: String,
	address: String,
	image: Buffer,
	lat: String,
	lang:String
	
}),
recipe = mongoose.model('recipe', recipeSchema);

module.exports = recipe;