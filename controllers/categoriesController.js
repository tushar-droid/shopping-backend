const asyncHandler = require('express-async-handler');

exports.categories_list = asyncHandler(async(req, res, next) =>{
    res.render("categories_list",{title: "This will list all the categories in the DB"})
})