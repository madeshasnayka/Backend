const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userModel=require("../model/user.model")
const postModel=require("../model/post.model")
async function registerController(req,res){
    const {userName,email,password,bio,profileImg}=req.body
    const isUserAlreadyExist=await userModel.findOne({
        $or:[
            {
                userName
            },
            {
                email
            }
        ]
    })
    if(isUserAlreadyExist){
        res.status(409).json({
            message:"the user is already exists with"+(userName==isUserAlreadyExist.userName?" user name ": " email id")
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user= await userModel.create(
        {
            userName,
            email,
            password:hash,
            bio,
            profileImg            
        }
    )
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,
    {
        expiresIn:"2d"
    }

)
res.cookie("jwtToken",token)
res.status(201).json({
    message:"the user get register successfully",
    user:{
        userName,
        email,
        bio,
        profileImg:profileImg
    }
})

}
async function loginController(req,res) {
const {userName,email,password}=req.body;

const isUserExist=await userModel.findOne({
    $or:[{
        userName
    },
  {
    email
  }
]
})  
if(!isUserExist){
    return  res.status(404).json({
        message:"username or email not registered yet."
    })

}  
const isPassMatch=await bcrypt.compare(password,isUserExist.password)
if(!isPassMatch){
    return res.status(401).json({
        message:"enter a valid password!!!"
    })
}
const token=await jwt.sign({
    Id:isUserExist._id
},process.env.JWT_SECRET,{expiresIn:"2d"})

res.cookie("jwtToken",token)
res.status(200).json({
    message:"user logged in successfully",
    isUserExist:{
        userName:isUserExist.userName,
        email:isUserExist.email,
        bio:isUserExist.bio,
        profileImg:isUserExist.profileImg
    }
  
})

}
module.exports={
    registerController,
    loginController
}