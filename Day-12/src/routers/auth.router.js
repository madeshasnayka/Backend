const express=require("express")
const crypto=require("crypto")
const userModel=require("../model/database.model")
const router=express.Router()
const jwt=require("jsonwebtoken")

router.post("/register",async (req,res)=>{

    const {userName,email,password}=req.body;
    const registerUser=await userModel.find({email})
    if(registerUser){
        res.status(409).json({
            message:"email is already exist in the app",
            registerUser
        })
    }
    const hash_Pass=crypto.createHash("md5").update(password).digest("hex")
    const user=await userModel.create({userName,email,password:hash_Pass})
    const token=jwt.sign({user_id:user._id,
        email:email
    },
        process.env.JWT_SECRETE
    )
    res.cookie("jwt_token",token)
    res.status(201).json({
        message:"user registered successfully",
         user,
         token
    })

})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.find({email})
    if(!user){
        res.status(404).json({
            message:"user does not found with this email id"
        })
    }
    const isPassmatch=crypto.createHash("md5").update(password).digest("hex")
    if(!isPassmatch){
        res.status(401).json({
            message:"invalid password"
        })
    }
    const token=jwt.sign(
        {
        user_id:user._id
    },process.env.JWT_SECRETE)
    
    res.cookie("jwt_token2",token)
    res.status(200).json({
        message:"user logged in",
        user
    })
})
module.exports=router