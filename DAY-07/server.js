require("dotenv").config();
const express=require("express")
const app=require("./src/app")
const mongoose=require("mongoose");
const PORT=process.env.PORT||3000;
const connectDb=require("./src/config/database")
const notesModel=require("./src/models/notes.model")
connectDb()
app.use(express.json())
app.post("/notes",async (req,res)=>{
   let {title,description} =req.body;
   const notes=await notesModel.create({
    title,
    description
   })
   res.status(201).json({
    "message":"notes created successfully",
    notes
   })
})
app.get("/notes",async(req,res)=>{
   let allnotes=await notesModel.find()
   res.status(200).json({
    "msg":"notes fetched successfully",
    allnotes
   })
})

app.listen(PORT,()=>{
    console.log(`the server is running on the port ${PORT}`);
})