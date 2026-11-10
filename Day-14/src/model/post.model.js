const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        require:[true,"caption is required"]
    },
    imageUrl:{
        type:String,
        require:[true,"image is required for creating a post"]
    },
    userId:{
        ref:"userCollection",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"user id is required to create the post"]
    }
})
const postModel=mongoose.model("postsCollection",postSchema)
module.exports=postModel