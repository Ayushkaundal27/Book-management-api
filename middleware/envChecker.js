require('dotenv').config()
const envChecker = (req,res,next)=>{
    if(process.env.MONGODB_URL=="" || process.env.MONGODB_URL==null)return res.json({
        message:"please add mongodb url"
    })
    if(process.env.JWT_SECRET==null){
        return res.json({
            message:"please add Jwt secret"
        })
    }
    next()
}
module.exports={
    envChecker
}