const mongoose=require("mongoose")
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfullly");});
}
module.exports=connectDB;