const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
/** require route */
const authRouter=require("../src/router/auth.route")
const postRouter=require("../src/router/post.route")
const userRouter=require("../src/router/user.route")

/** api handling */
app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/user",userRouter)
module.exports=app;
