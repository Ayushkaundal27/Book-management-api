const express = require('express');
const  app  = express();
const { rootRouter } = require("./routes/root");
require('dotenv').config();
app.use('/api/v1',rootRouter) 
app.listen(3000,async()=>{
    console.log("server started",)
})