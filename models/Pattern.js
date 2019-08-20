const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatternSchema = new Schema({
	patternNumber: { 
		type: Number, 
		required: true 
	},
	page: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Page'
	}]
});

const Pattern = mongoose.model("Pattern", PatternSchema);

module.exports = Pattern;