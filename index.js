const express=require("express")
const connectdb = require('./db/connection')
const urlRoutes=require('./routes/APIroute')
const cors=require('cors')
require('dotenv').config()

connectdb();
const app=express();
const Port=process.env.PORT || 8000

app.use(express.json());
app.use(cors());
app.use('/',urlRoutes);
app.listen(Port,(err)=>{
    if(!err){
        console.log("Server connected")

    }
})