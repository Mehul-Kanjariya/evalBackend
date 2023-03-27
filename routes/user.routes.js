const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../model/user.model");

userRouter.post("/register", async(req,res)=>{
    const {name, email, gender, password, age, city, is_married} = req.body;
    let searchDuplicate = await UserModel.findOne({email})
    console.log(searchDuplicate)
    if(searchDuplicate){
        res.status(400).send({"message":"User already exist, please login"});
        return;
    }
    bcrypt.hash(password, 5, async (err, hash)=>{
        if(hash){
            try{
                const user = new UserModel({name, email, gender, password:hash, age, city, is_married});
                await user.save();
                res.status(200).send({"message":"New User Registered"});
            }catch(err){
                res.status(400).send({"message":err.message});
            }
        }else{
            res.status(400).send({"message":err.message});
        }
    })
})

userRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    try{
        user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    res.status(200).send({"message":"Login successful","token":jwt.sign({"userID":user._id},'MASAI')})
                }else{
                    res.status(400).send({"message":"Wrong Credentials"})
                }
            })
        }else{
            res.status(400).send({"message":"Email not registered"})
        }
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports={
    userRouter
}