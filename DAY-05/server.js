const app=require("./src/app");
const mongoose=require("mongoose")
const PORT=process.env.PORT||3000;

function mongoDb(){
mongoose.connect("mongodb+srv://madeshnayak7712_db_user:oCBg9FVPR7QR9imq@cluster0.npz0e91.mongodb.net/day-06")
.then(()=>{
    console.log("Db connected successful")
})
}
mongoDb()
app.get('/',(req,res)=>{
    res.send("Welcome landing page")
})
app.listen(PORT,()=>{
    console.log(`the server is running in the port ${PORT}`);
})