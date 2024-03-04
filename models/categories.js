const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String},
});

categorySchema.virtual('url').get(function(){
    return `/shop/categories/${this._id}`;
})


module.exports = mongoose.model("productcategories",categorySchema)