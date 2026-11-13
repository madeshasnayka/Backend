const mongoose=require("mongoose")
const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        require:[true,"follower is required"]
    },
    followee:{
        type:String,
        require:[true,"followee is required"]
    },
    status:{
        type:String,
        enum:['accepted','pending','rejected'],
        default:'pending'
    }
},{timestamps:true})
followSchema.index({follower:1,followee:1},{unique:true})
const followModel=mongoose.model("follows",followSchema)
module.exports=followModel