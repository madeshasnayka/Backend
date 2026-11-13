const followModel=require("../model/follow.model")
const userModel=require("../model/user.model")
async function followController(req,res){
  const followingId=req.params.userName;
  const followerId=req.user.userName;
  console.log(followerId)
  if(followingId==followerId){
    return res.status(401).json({
        message:"you can't  follow your self."
    })
  }
  const followeeRecord=await userModel.findOne({
   userName:followingId
  })
  if(!followeeRecord){
    return res.status(404).json({
        message:"user not found."
    })
  }
  const followRequest=await followModel.create({
    follower:followerId,
    followee:followeeRecord.userName,
    status:'pending'
  })
  res.status(201).json({
    message:"follow request sent successfully.",
    followRequest
  })
}

async function acceptFollowRequestController(req,res){
   const followerId=req.params.userName;
   const currentUser=req.user.userName;

   const followerRecord=await followModel.findOne({
    follower:followerId,
    followee:currentUser,
    status:'pending'
   })
   if(!followerRecord){
    return res.status(404).json({
        message:"user not found."
    })
   }
   followerRecord.status='accepted';
   await followerRecord.save()
   res.status(200).json({
    message:"follow request accepted successfully",
    followerRecord
   })

}

async function rejectFollowRequestController(req,res) {
   const followerId=req.params.userName;
   const currentUser=req.user.userName;

   const followerRecord=await followModel.findOneAndDelete({
    follower:followerId,
    followee:currentUser,
    })
   if(!followerRecord){
    return res.status(404).json({
        message:"user not found."
    })
   }
  res.status(200).json({
    message:"user follow requested unfollow/rejected successfully."
  })
}
async function viewAllFollower(req,res){
    const userId=req.params.userName;
    const followerList=await followModel.find({
        followee:userId,
        status:'accepted'
    })
    .sort({createdAt:-1})
    if(!followerList){
        return res.status(404).json({
            message:"user is not found."
        })
    }
 res.status(200).json({
    message:"follower list",
    followerList
 })
}



module.exports={followController,acceptFollowRequestController,rejectFollowRequestController,viewAllFollower}