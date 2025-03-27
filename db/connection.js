const mongoose=require('mongoose');
require('dotenv').config();

const url=process.env.MONGO_URI;

const connectdb=async ()=>{
    try{
        await mongoose.connect(url)
        console.log("database connected");
    }
    catch(err){
        console.log("failed to connect Database",err.message)
        process.exit(1)
    }
};

module.exports = connectdb 