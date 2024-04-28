const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:30
    },
    userPassword:{
        type:String,
        requred:true,
        minlength:6
    }
})
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true }
  });
const userdb = mongoose.model('user',userSchema);
const bookdb = mongoose.model('book',bookSchema);
module.exports ={
    userdb,
    bookdb
}

