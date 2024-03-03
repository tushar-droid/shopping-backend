
const asyncHandler = require('express-async-handler');



exports.products_list = asyncHandler(async(req, res, next) =>{
    res.render('products_list', {title: 'This will list all the Products in the DB'})
})