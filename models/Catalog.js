const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
        company: {
                type: Schema.Types.ObjectId,
                ref: 'Company'
        },
        year: {
                type: Number,
                required: true
        },
        season: {
                type: String,
                required: true
        },
        pages: [{
                type: Schema.Types.ObjectId,
                ref: 'Page'
        }],
     
     
});

const Catalog = mongoose.model("Catalog", CatalogSchema);

module.exports = Catalog;
