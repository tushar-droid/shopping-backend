const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
router.get('/', asyncHandler(async(req,res,next) =>{
    res.redirect('/shop')
}))
router.get('/shop', asyncHandler(async(req,res,next) =>{
    res.render('index', {title: 'Shop'})
}))





module.exports = router