const asyncHandler = require('express-async-handler');
const Category = require('../models/categories');
const Product = require('../models/product');
exports.categories_list = asyncHandler(async(req, res, next) =>{
    const all_categories = await Category.find({}).exec()
    res.render("categories_list",{
        title: "Categories",
        all_categories
    
    })
});

exports.products_in_category = asyncHandler(async(req, res, next) =>{
    const [products, category_name] = await Promise.all([
        Product.find({categories:req.params.id}).exec(),
        Category.findById(req.params.id).exec()
    ])

    res.render('products_list', {
        title: category_name.name, 
        all_products: products,
    });
})