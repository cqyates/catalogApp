const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
        catalog: [{
                type: Schema.Types.ObjectId,
                ref: 'Catalog'
        }],
        patterns: [{
                type: Number,
                required: false
        }],
        imgURL: {
                type: String,
                required: false,
                unique: true,
        }
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;