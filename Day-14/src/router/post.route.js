const express=require("express")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const postController=require("../controllers/post.controller")
const likeController=require("../controllers/like.controller")
const postRouter=express.Router()

const identifier=require("../middleware/auth.middleware")

postRouter.post("/",upload.single("maddy"),identifier,postController.createPostController)
postRouter.get("/",identifier,postController.getPostController)
postRouter.get("/details/:postId",identifier,postController.getPostDetailsController)

/** likes */

postRouter.post("/like/:postId",identifier,likeController.likeController)
postRouter.post("/dislike/:postId",identifier,likeController.disLikeController)
module.exports=postRouter