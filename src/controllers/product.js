const Product = require('../models/product')
const mongoose = require('mongoose')
exports.product_get_all=async (req,res)=>{
    
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs=>{
        const response = {
            count:docs.length,
            products:docs.map(doc=>{
                return{
                    name:doc.name,
                    price:doc.price,
                    _id:doc._id,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })


     
}

exports.create_products=async (req,res)=>{
    try{
        const product = await new Product({
        name:req.body.name,
        price:req.body.price
    
        })
        product.save()
        res.status(201).json({
            message:'products are created succesfully',
            createdProducts:{
                name:product.name,
                price:product.price,
                _id:product.id,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+product._id
                }
            }
        })
    }catch(error){
        res.status(400).send(error.message)
    
    }
    }
    exports.get_one_product=async(req,res)=>{
        try{
        Product.findById(req.params.id,(error,product)=>{
                res.status(201).json({
                    message:"Found Product",
                    products:product,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+product._id
                    }
                })
        })
        }catch(error){
                res.status(400).send(error.message)
    }
    }

    exports.update_product=(req,res)=>{
        const id = req.params.id
        const updateOps={}
        for(const ops of req.body){
            updateOps[ops.propName]=ops.value
           
        }
        Product.update({ _id: id},{$set:updateOps})
        .exec()
        .then(result=>{
            res.status(200).json({
            message:'Product Updated',
            requests:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+id
                    
            }
        })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }

    exports.delete_product=(req,res,next)=>{
        const id = req.params.id
        Product.remove({ _id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:'Product Deleted',
                requests:{
                    type:'POST',
                    url:'http://localhost:3000/products',
                    body:{name:'String',price:'Number'}
    
                }
            })
        }).catch(error=>{
            res.status(500).json(error.message)
        })
    }