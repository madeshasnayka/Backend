const mongoose=require("mongoose")
const userSChema=new mongoose.Schema({
    userName:{
        type:String,
        unique:[true,"with this username user already exisits"],
        require:[true,"userName is required"]
    },
    email:{
        type:String,
        unique:[true,"with this email already exisits"],
        require:[true,"email is required"]
    },
    password:{
        type:String,
        require:[true,"password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/Mady07/profile.webp?updatedAt=1794203472604"
    }
})
const userModel=mongoose.model("userCollection",userSChema);
module.exports=userModel