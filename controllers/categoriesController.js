const asyncHandler = require('express-async-handler');
const Category = require('../models/categories');
const Product = require('../models/product');
const { body, validationResult } = require('express-validator');





exports.categories_list = asyncHandler(async(req, res, next) =>{
    const all_categories = await Category.find({}).exec()
    res.render("categories_list",{
        title: "Categories",
        all_categories
    })
});

exports.products_in_category = asyncHandler(async(req, res, next) =>{
    const [products, category] = await Promise.all([
        Product.find({categories:req.params.id}).exec(),
        Category.findById(req.params.id).exec()
    ])

    res.render('products_list', {
        title: category.name, 
        category:category,
        all_products: products,
    });
})

exports.category_delete_get = asyncHandler(async(req, res, next) =>{
    const [products, category] = await Promise.all([
        Product.find({categories:req.params.id}).exec(),
        Category.findById(req.params.id).exec()
    ]);
    res.render("delete_category", {
        title: 'Delete Category',
        category,
        products
    });
})

exports.category_delete_post = asyncHandler(async(req, res, next) =>{
    const [products, category] = await Promise.all([
        Product.find({categories:req.params.id}).exec(),
        Category.findById(req.params.id).exec()
    ]);

    if (products.length){
            res.render("delete_category", {
                title: 'Delete Category',
                category,
                products
            });
            return;
    }
    else{
        await Category.findByIdAndDelete(req.body.category_id);
        res.redirect('/shop/categories')
    }
})


exports.add_category_get = asyncHandler(async(req, res, next) =>{
    res.render('add_category',{
        title: 'Add a new Category'
    })
})


exports.add_category_post = [
    body("categoryname", "Category Name should contain atleast 3 letters")
        .trim()
        .isLength( { min:3 } )
        .escape(),
    asyncHandler(async(req, res, next) =>{
        const errors = validationResult(req);
        const new_category = new Category({name: req.body.categoryname});
        if(!errors.isEmpty()){
            res.render('add_category',{
                title: 'Add a new category',
                category: new_category,
                errors: errors.array()
            })
            return;
        }
        else{
            const category_exist = await Category.findOne({name: req.body.categoryname}).exec()
            if(category_exist){
                res.redirect(category_exist.url)
            }
            else{
                await new_category.save();
                res.redirect(new_category.url)
            }
        }
    })
]