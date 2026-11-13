const likeModel=require("../model/likes.model")
const postModel=require("../model/post.model")

async function likeController(req,res){
  const postId=req.params.postId;
  const userName=req.user.userName;
  const isPostAvailable=await postModel.findOne({
    _id:postId
  })
  if(!isPostAvailable){
    return res.status(404).json({
        message:"post not found."
    })
  }
  const likePost=await likeModel.create({
    post:postId,
    user:userName
  })
  res.status(201).json({
    message:"post get liked successfully",
    likePost
  })
}

async function disLikeController(req,res) {
  const postId=req.params.postId;
  const userName=req.user.userName;
  const isPostAvailable=await postModel.findOne({
    _id:postId
  })
  if(!isPostAvailable){
    return res.status(404).json({
        message:"post not found."
    })
  }
  const disLikePost=await likeModel.findOneAndDelete({
    post:postId,
    user:userName,
  })
    res.status(200).json({
    message:"post get disliked successfully",
  
  })
}
module.exports={
    likeController,disLikeController
}