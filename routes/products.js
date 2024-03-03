const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoriesController = require('../controllers/categoriesController')
router.get('/products', productController.products_list);
router.get('/categories', categoriesController.categories_list)


module.exports = router;