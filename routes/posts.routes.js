const express = require("express");
const postRouter = express.Router();
const {PostModel} = require("../model/post.model");
const jwt = require("jsonwebtoken");

postRouter.post("/add",async(req,res)=>{
    try{
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({"message":"A new post has been made"});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

postRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization;
    let decoded = jwt.verify(token, 'MASAI')
    let {page} = req.query;
    page=page*3
    let {min, max} = req.query;
    if(min, max){
        try{
            const posts = await PostModel.find({$and:[{userID:decoded.userID},{no_of_comments:{$gte:min}},{no_of_comments:{$lte:max}}]}).skip(page).limit(3);
            res.status(200).send(posts);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }else{
        try{
            const posts = await PostModel.find({userID:decoded.userID}).skip(page).limit(3);
            res.status(200).send(posts);
        }catch(err){
            res.status(400).send({"message":err.message});
        }
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    const payload = req.body;
    try{
        const post = await PostModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({"message":`Post with id ${id} has been updated`});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const post = await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({"message":`Post with id ${id} has been deleted`});
    }catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports={
    postRouter
}