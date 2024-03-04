const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String},
    categories: [{type: Schema.Types.ObjectId, ref: "productcategories"}],
    image: {type: String},
    in_stock: {type: Boolean},
    price: {type: Number},
    brand: {type: String},
    rating: {type: Number}
});

productSchema.virtual('url').get(function(){
    return `/shop/products/${this._id}`;
})




module.exports = mongoose.model("products", productSchema)