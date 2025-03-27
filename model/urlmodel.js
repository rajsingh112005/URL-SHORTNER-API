const mongoose=require("mongoose")
const shortid=require("shortid")
const sch=new mongoose.Schema({
    originalURL:{
        type:String,
        required:true,
    },
    shortURL:{
        type:String,
        unique:true,
        default: shortid.generate,
    },
    clicks:{
        type:Number,
        default:0,
    }
});

module.exports= mongoose.model('URL',sch);