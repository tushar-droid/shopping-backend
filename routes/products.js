const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoriesController = require('../controllers/categoriesController')




//PRODUCT ROUTES
router.get('/products', productController.products_list);
router.get('/products/:id', productController.product_details);





//CATEGORY ROUTES
router.get('/categories', categoriesController.categories_list);
router.get('/categories/:id', categoriesController.products_in_category);

module.exports = router;