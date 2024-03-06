
const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
const Category = require('../models/categories')
const { body, validationResult } = require('express-validator')

exports.products_list = asyncHandler(async(req, res, next) =>{

    //GET ALL THE PRODUCTS LISTINGS FROM THE DB AND SHOW ONLY NAME AND CATEGORIES, THEN POPULATE THE CATEGORIES SECTION USING THE OBJECTID AND REFERENCE

    const all_products = await Product.find({}).populate('categories').exec();
    
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
    res.render('add_product', {title: 'Add a new product.', categories})
});

exports.add_product_post = [
    body("product_name", "Title should be more than 2 letters")
        .trim()
        .isLength({min: 2})
        .escape(),
    body("price")
        .trim()
        .isNumeric()
        .escape(),
    body('brand',"brand should be more than 2 letters" )
        .trim()
        .isLength({min: 2})
        .escape(),
    body('rating')
        .trim()
        .isNumeric()
        .escape(),
    body("category", "There should be atleast 1 category related to the product")
        .notEmpty(),
    asyncHandler(async(req, res, next) =>{
        const errors = validationResult(req);
        const categories = await Category.find({}).sort({name: 1}).exec();
        
        
        
        const product = new Product({
            name: req.body.product_name,
            categories: req.body.category,
            in_stock: req.body.stock_status ==='in_stock' ? true : false,
            price: req.body.price,
            image: req.body.image_url,
            brand: req.body.brand,
            rating: req.body.rating
        });
        
        
        categories.forEach((cat) =>{
            if (product.categories.includes(cat._id)) cat.checked= "true"
        })

        if(!errors.isEmpty()){
            res.render("add_product",{
                title: 'Add a new product',
                categories,
                product,
                errors: errors.array()
            });
            return
        }else{
            await product.save();
            res.redirect('/shop/products')
        }
    })
]


exports.update_product_get = asyncHandler(async(req, res, next) =>{
    const [product, categories] = await Promise.all([
        Product.findById(req.params.id).sort({name:1}).exec(),
        Category.find({}).exec()
    ])
    if(product === null){
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
    }

    categories.forEach((cat) =>{
        if (product.categories.includes(cat._id)) cat.checked= "true"
    })

    res.render("add_product",{
        title: 'Update the product',
        categories,
        product,
        updating: true
    });
    
})


exports.update_product_post = [
    body("product_name", "Title should be more than 2 letters")
        .trim()
        .isLength({min: 2})
        .escape(),
    body("price")
        .trim()
        .isNumeric()
        .escape(),
    body('brand',"brand should be more than 2 letters" )
        .trim()
        .isLength({min: 2})
        .escape(),
    body('rating')
        .trim()
        .isNumeric()
        .escape(),
    body("category", "There should be atleast 1 category related to the product")
        .notEmpty(),


    asyncHandler(async(req, res, next) =>{
        const errors = validationResult(req);
        const product = new Product({
            name: req.body.product_name,
            categories: req.body.category,
            in_stock: req.body.stock_status ==='in_stock' ? true : false,
            price: req.body.price,
            image: req.body.image_url,
            brand: req.body.brand,
            rating: req.body.rating,
            _id: req.params.id,
            updating: true

        });

        if(!errors.isEmpty()){
            const categories = Category.find({}).exec()
            categories.forEach((cat) =>{
                if (product.categories.includes(cat._id)) cat.checked= "true"
            })
            res.render("add_product",{
                title: 'Update the product',
                categories,
                product,
                errors: errors.array()                
            });
            return
        }
        else{
            const udpatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {});

            res.redirect(udpatedProduct.url)
        }



    })

]