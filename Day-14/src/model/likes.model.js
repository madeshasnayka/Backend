const mongoose=require("mongoose")
const likesSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postsCollection"
        
    },
    user:{
        type:String,
       
    }
},{
    timestamps:true
})
likesSchema.index({post:1,user:1},{unique:true})
const likeModel=mongoose.model("likesCollection",likesSchema)
module.exports=likeModel;