const express =  require('express');
const bookRouter = express.Router();
const mongoose = require('mongoose');
bookRouter.use(express.json());
require('dotenv').config();
const zod = require('zod');
const { bookdb } = require('../models');
const { authware } = require('../middleware/authware');
const { inputCheck, updateCheck } = require('../validation');
mongoose.connect(process.env.MONGODB_URL)
bookRouter.post('/add',async(req,res)=>{
  var check = inputCheck.safeParse(req.body)
  if(!check.success)return res.status(400).json({
    requestedBy:req.userID,
    message:"invalid input",
    issues:check.error.issues
})
req.body.author = req.body.author.toLowerCase()
  var checkDB = await bookdb.findOne(req.body);
  if(checkDB==null){
    await bookdb.create(req.body);
    return res.json({
      requestedBy:req.userID,
      message:"book added"
    })
  }
  res.json({
    requestedBy:req.userID,
    message:req.body.title+" already exist "
  })
})
bookRouter.get('/search',authware,async(req,res)=>{
  const publicationYearChecker=zod.number().refine((value)=>{
    if(value>=1000 && value<=year)return 1;
    return 0;
  })
var author  = req.query.author;
author =(author!=null)?author.toLowerCase():""
var arr = [{author:{"$regex":author}}];
var check = publicationYearChecker.safeParse(Number(req.query.publicationYear));
if(check.success) var result = await bookdb.find({$or:arr,publicationYear:Number(req.query.publicationYear)})
else var result = await bookdb.find({$or:arr})
  return res.json(result)
})
bookRouter.put('/update',async(req,res)=>{
  var check  = updateCheck.safeParse(req.body)
  if(check.success){
    const book = await bookdb.findOne({
      title:req.body.title,
      author:req.body.author,
      publicationYear:req.body.publicationYear
    });
    if(book==null)return res.status(400).json({
      message:"no book found with name"+req.body.title
    })
    await bookdb.updateOne({_id:book._id},{
      title:req.body.title_update,
      author:req.body.author_update,
      publicationYear:req.body.publicationYear_update
    })
    return res.json({
      message:"updated"
    })
  }
  res.json({
    message:"error while updating",
    error:check.error.issues
  })
  
})
bookRouter.delete('/delete',async(req,res)=>{
  var check  = inputCheck.safeParse(req.body)
  if(check.success){
    const book = await bookdb.findOne(req.body);
    if(book==null)return res.status(400).json({
      message:"no book found with name"+req.body.title
    })
    await bookdb.deleteOne({_id:book._id})
    return res.json({
      message:"deleted"
    })
  }
  res.json({
    message:"error while deleting",
    error:check.error.issues
  })
})
module.exports = bookRouter;