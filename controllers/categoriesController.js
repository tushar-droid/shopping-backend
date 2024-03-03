const asyncHandler = require('express-async-handler');
const Category = require('../models/categories');

exports.categories_list = asyncHandler(async(req, res, next) =>{
    const all_categories = await Category.find({}).exec()
    res.render("categories_list",{
        title: "This will list all the categories in the DB",
        all_categories
    
    })
})