const jwt  = require('jsonwebtoken')
require('dotenv').config()
const authware=(req,res,next)=>{
   try{
const user  = jwt.verify(req.headers.authtoken,process.env.JWT_SECRET); 
req.userID = user.userEmail
next()
   }catch(e){
   return res.status(401).json({
    message:"please login or signup",
    error:e
})
   }
}
module.exports = {
    authware
}