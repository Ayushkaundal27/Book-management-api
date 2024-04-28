const express  = require('express');
const { userRouter } = require('./user');
const bookRouter = require('./books');
const { authware } = require('../middleware/authware');

const rootRouter = express.Router();
rootRouter.get('/',(req,res)=>{
    res.json({message:"hello"})
})
rootRouter.use('/user',userRouter);
rootRouter.use('/book',authware,bookRouter);
module.exports ={
    rootRouter
}