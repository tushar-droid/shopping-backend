const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    categories: [{type: Schema.Types.ObjectId, ref: "productcategories"}],
    in_stock: {type: Boolean},
    price: {type: Number},
    brand: {type: String},
    rating: {type: Number}
});

module.exports = mongoose.model("products", productSchema)