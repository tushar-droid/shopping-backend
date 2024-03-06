
const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
const Category = require('../models/categories')

exports.products_list = asyncHandler(async(req, res, next) =>{

    //GET ALL THE PRODUCTS LISTINGS FROM THE DB AND SHOW ONLY NAME AND CATEGORIES, THEN POPULATE THE CATEGORIES SECTION USING THE OBJECTID AND REFERENCE

    const all_products = await Product.find({} ).populate('categories').exec();
    
    //RENDER THE PRODUCTS LIST VIEW AND SEND THE TITLE AND THE ALL_PRODUCTS LIST 
    res.render('products_list', {
        title: 'Products', 
        all_products: all_products,
    });
});


exports.product_details = asyncHandler(async(req,res,next) =>{
    const product_information = await Product.findById(req.params.id).populate('categories').exec();
    console.log(product_information)
    res.render('product_details', {
        title: 'Product Details',
        product_information
    })
});


exports.delete_product_get = asyncHandler(async(req,res,next) =>{
    const product = await Product.findById(req.params.id, "name").exec();
    res.render("delete_product", {title: "Delete Product", product: product})
})

exports.delete_product_post = asyncHandler(async(req,res,next) =>{
    await Product.findByIdAndDelete(req.body.product_id);
    res.redirect('/shop/products')
});


exports.add_product_get = asyncHandler(async(req, res, next) =>{
    const categories = await Category.find({}).sort({name: 1}).exec();
    res.render('add_product', {title: 'Here you will add a new product.', categories})
})