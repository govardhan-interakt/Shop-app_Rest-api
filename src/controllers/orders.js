const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')
exports.order_get_all= (req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            orders:docs.map(doc=>{
                return {
                    _id:docs._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+doc._id
                    }
                }
            })
        
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

exports.create_orders=(req,res)=>{
    Product.findById(req.body.productId)
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:"products not found"
                })
            }
            const order = new Order({
                _id:mongoose.Types.ObjectId(),
                quantity:req.body.quantity,
                product:req.body.productId
            })
           return order
           .save()
            })
            .then(result=>{
                res.status(201).json({
                    message:'Order stored',
                    createdOrder:{
                        _id:result._id,
                        product:result.product,
                        quantity:result.quantity
                    },
                    requests:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+result._id
                    }
                })
           
        })
        .catch(err=>{
            res.status(500).json({
                message:'product not found',   
                error:err       
              })
        })
}
exports.orders_get_one=(req,res)=>{
    Order.findById(req.params.id)
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message:'Order not found'
            })
        }
        res.status(200).json({
            Order:order,
            requests:{
                type:'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
}
exports.delete_order=(req,res)=>{
    Order.remove({_id:req.params.id})
   .exec()
   .then(result=>{
    res.status(200).json({
        message:'Order deleted',
        requests:{
            type:'POST',
            url: 'http://localhost:3000/orders',
            body:{productId:'ID',quantity:'NUmber'}
        }
    })
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
})

}