
const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
const Category = require('../models/categories')

exports.products_list = asyncHandler(async(req, res, next) =>{
    const all_products = await Product.find({}, 'name categories' ).populate('categories').exec();
    // const all_products = await Product.find({}).exec()
    res.render('products_list', {
        title: 'This will list all the Products in the DB', 
        all_products: all_products,
    });
})