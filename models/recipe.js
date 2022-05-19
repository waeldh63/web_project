var mongoose = require('mongoose');
var Schema = mongoose.Schema;

recipeSchema = new Schema( {
	
	name: String,
	address: String,
	//image: Buffer,
	lat: String,
	lang : String,

	cuisine: {
        type: String,
        required: true
    },
	
}),

Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;