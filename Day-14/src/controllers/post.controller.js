const jwt =require("jsonwebtoken")
const postModel=require("../model/post.model")
const Imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const bcrypt=require("bcrypt")
const imageKit=new Imagekit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY
})
async function createPost(req,res) {
 const token=req.cookies.jwtToken


 if(!token){
    return res.status(401).json({
        message:"provide valid token,Unauthorized acccess"
    })
 }
 let decode = null;
 try{

    decode=jwt.verify(token,process.env.JWT_SECRET)

 }
 catch(err) { 
return res.status(401).json({
    message:"user not authorized"
})
     
 }
  console.log(decode)
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
        userId:decode.id
    })
    res.status(201).json({
        message:"post created Successfully.",
        post
    })

}
module.exports={createPost}