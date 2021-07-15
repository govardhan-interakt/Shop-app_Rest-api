const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userController = require('../controllers/user')



router.post('/user/signup',userController.user_register)

router.post('/user/login',userController.user_login)

router.delete('/user/:id',userController.user_delete)


module.exports=router