const mongoose=require("mongoose")
async function connectToDb() {
   await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongo_db connected successfully")
    })
}
module.exports=connectToDb