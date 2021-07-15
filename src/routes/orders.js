const express = require('express')

const router = express.Router()


const ordersController = require('../controllers/orders')

router.get('/orders',ordersController.order_get_all)


router.post('/orders',ordersController.create_orders)

router.get('/orders/:id',ordersController.orders_get_one)

router.delete('/orders/:id',ordersController.delete_order)


module.exports = router