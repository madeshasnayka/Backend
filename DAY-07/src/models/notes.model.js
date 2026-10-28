const mongoose=require("mongoose")

const notesSChema=new mongoose.Schema({
    title:String,
    description:String
})

const notesModel=mongoose.model("notes",notesSChema);
module.exports=notesModel;