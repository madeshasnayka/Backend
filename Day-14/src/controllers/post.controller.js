const jwt =require("jsonwebtoken")
const postModel=require("../model/post.model")
const Imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const bcrypt=require("bcrypt")
const imageKit=new Imagekit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY
})
async function createPostController(req,res) {
  const userId=req.user;
  const file=await imageKit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName:"Test",
    folder:"cohort-2-insta-clone-posts"
  })
    // const{caption,imageUrl}=req.body
    console.log(req.body,req.file)
    const post=await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        userId:req.user.Id
    })
    res.status(201).json({
        message:"post created Successfully.",
        post
    })

}
async function getPostController(req,res){
   const userId=req.user.Id;
  const posts=await postModel.find({userId:userId})
  res.status(200).json({
    message:"post fetched successfully",
    posts
  })

}
async function getPostDetailsController(req,res) {

    const postId=req.params.postId;
    const userId=req.user.Id;
  const userPost=await postModel.findOne({userId:postId})
  if(!userPost){
    return res.status(404).json({
        message:"resource not found"
    })
  }
  const isValidUser=userPost.userId.toString()===userId;
 if(!isValidUser){
    return res.status(403).json({
        message:"unauthorized access."
    })
 }
 res.status(200).json({
    message:"details of the post.",
    userPost
 })
    
}

module.exports={createPostController,getPostController,getPostDetailsController}