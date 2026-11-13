const express=require("express")
const identifier = require("../middleware/auth.middleware")

const userRouter=express.Router()
const userController=require("../controllers/user.controller")

userRouter.post("/follow/:userName",identifier,userController.followController)
userRouter.post("/follow/:userName/accept",identifier,userController.acceptFollowRequestController)
userRouter.post("/follow/:userName/reject",identifier,userController.rejectFollowRequestController)
userRouter.post("/unfollow/:userName",identifier,userController.rejectFollowRequestController)
userRouter.get("/follow/:userName",identifier,userController.viewAllFollower)

module.exports=userRouter