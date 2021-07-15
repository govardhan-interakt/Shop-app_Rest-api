const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
//const product = require('../models/product')
const Product = require('../models/product')
const checkAuth = require('../middleware/check-auth')
const productController= require('../controllers/product')

router.post('/products',productController.create_products)

router.get('/products',productController.product_get_all)
    

router.get('/products/:id',productController.get_one_product)

router.patch('/products/:id',productController.update_product)


router.delete('/products/:id',productController.delete_product)





module.exports= router