const express=require('express')
const URL=require("../model/urlmodel")
const router=express.Router();

router
    .route('/shorten')
    .post(async(req,res)=>{
    const {originalURL}=req.body;
    if(!originalURL) {
        return res.status(404).json("url is required")
    }

    try{
        const newUrl= new URL({originalURL})
        await newUrl.save();
        res.json({
            shortURL:`${process.env.BASE_URL}/${newUrl.shortURL}`
        })
    }
    catch(err){
       res.status(500).json({error:"Server Error"})
         console.log(err.message)
    }
})


router.
    route('/:shortURL')
    .get(async(req,res)=>{
    try{
        const url =await URL.findOne({shortURL:req.params.shortURL})
        if(!url){
            return res.status(404).json({error:"url not found"})
        }
        url.clicks++;
        await url.save();

        res.redirect(url.originalURL);
    } catch(err){
        res.status(500).json({error:"Server Error"})
        console.log(err.message)
    }
}).delete(async(req,res)=>{
    const url=await URL.findOne({shortURL:req.params.shortURL})
    if(!url){
        return res.status(404).json({error:"url not found"})
    }
    await URL.findOneAndDelete({shortURL:req.params.shortURL})
    res.status(200).json({process:"success complete"})
    console.log(`deleted url ${process.env.BASE_URL}/${url.shortURL}`)
})


module.exports=router;