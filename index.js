const express = require('express');
const  app  = express();
const { rootRouter } = require("./routes/root");
require('dotenv').config();
const {envChecker} = require('./middleware/envChecker');
const Connection = require('./dbconfig');
Connection()
app.use('/api/v1',envChecker,rootRouter) 
app.listen(3000,async()=>{
    console.log("server started",)
})