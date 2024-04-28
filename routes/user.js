const express =  require('express');
const userRouter = express.Router();
userRouter.use(express.json())
require('dotenv').config();
const zod  = require('zod');
const { userdb } = require('../models');
const jwt = require('jsonwebtoken');
const encode = require('bcryptjs');
const { userDataCheck } = require('../validation');
userRouter.post('/signup',async(req,res)=>{
    var check = userDataCheck.safeParse(req.body);
    if(!check.success)return res.status(400).json({
        message:"invalid input",
        issues:check.error.issues
    })
    var check_unique = await userdb.findOne({userEmail:req.body.userEmail})
    if(check_unique==null ){
        const salt =  await encode.genSalt(10)
        req.body.userPassword = await encode.hash(req.body.userPassword,salt); 
        await userdb.create(req.body);
        return res.status(200).json({
            message:"successfully created",
            token:jwt.sign({userEmail:req.body.email},process.env.JWT_SECRET)
        }) 
    }
    res.json({
        message:req.body.userEmail+" Already exists"
    })
})
userRouter.post('/signin',async(req,res)=>{
  var check = userDataCheck.safeParse(req.body);
  if(check.success){
    var checkUser = await userdb.findOne({userEmail:req.body.userEmail})
    if(checkUser==null)return res.status(404).json({
        message:"user not found"
    })
    if(! (await encode.compare(req.body.userPassword,checkUser.userPassword)))return res.status(404).json({
        message:"wrong password"
    })
    return res.status(200).json({
        message:"successfully logged in",
        token:jwt.sign({userEmail:req.body.userEmail},process.env.JWT_SECRET)
    })
  }
  res.status(400).json({
    message:"invalid input",
    issues:check.error.issues
    
  })
})
module.exports ={
    userRouter
}