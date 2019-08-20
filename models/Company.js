const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	name: { 
        type: String, 
        required: true 
    },
	catalogs: [{ type: Schema.Types.ObjectId, ref: 'Catalog' }]
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
