const express = require('express');
const router = express.Router()

const{
 createProduct,
 getALLProduct
} = require('../controllers/productController');

const{ uploadProductImage } = require('../controllers/uploadsController')


router.route('/').post(createProduct).get(getALLProduct)
router.route('/uploads').post(uploadProductImage)


module.exports = router;