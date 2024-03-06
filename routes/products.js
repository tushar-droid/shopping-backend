const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoriesController = require('../controllers/categoriesController')




//PRODUCT ROUTES
router.get('/products', productController.products_list);
router.get('/products/add', productController.add_product_get);
router.post('/products/add', productController.add_product_post);

router.get('/products/:id', productController.product_details);
router.get('/products/:id/delete', productController.delete_product_get);
router.post('/products/:id/delete', productController.delete_product_post);
router.get('/products/:id/update', productController.update_product_get);
router.post('/products/:id/update', productController.update_product_post);


//CATEGORY ROUTES
router.get('/categories', categoriesController.categories_list);
router.get('/categories/add', categoriesController.add_category_get);
router.post('/categories/add', categoriesController.add_category_post);
router.get('/categories/:id', categoriesController.products_in_category);
router.get('/categories/:id/delete', categoriesController.category_delete_get);
router.post('/categories/:id/delete', categoriesController.category_delete_post);

module.exports = router;