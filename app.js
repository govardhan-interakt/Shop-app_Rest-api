const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./src/routes/products')
require('dotenv').config()
const orderRoutes = require('./src/routes/orders')
const userRoutes = require('./src/routes/user')
const connectDB = require('./src/config/db')
const port = process.env.PORT
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/',productRoutes)
app.use('/',orderRoutes)
app.use('/',userRoutes)
app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})
connectDB()
app.listen(port,()=>{
    console.log('server is up and running on 3000')
})