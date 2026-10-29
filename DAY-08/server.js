require("dotenv").config();
const express=require("express")
const mongoose=require("mongoose")
const app=require("./src/app")
const connectDB=require("./src/config/database")
const notemodel=require("./src/model/note.model")
const path=require("path")
// app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/notes",async (req,res)=>{
    const {title,Description}=req.body;
    const notes=await notemodel.create({title,Description});
    res.status(201).json({
        message:"notes created successfully",
        notes
    })
})
app.get("/api/notes",async(req,res)=>{
     const notes=await notemodel.find()
     res.status(200).json({
        message:"notes fetched sucessfully",
        notes
     })

})

app.put("/api/notes/:id",async(req,res)=>{
    const {title,Description}=req.body;
    let id=req.params.id;
    await notemodel.findOneAndUpdate({_id:id},{title,Description});
    res.status(200).json({
        message:"notes updated successfully",
        Description
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    let id=req.params.id;
    await notemodel.findOneAndDelete({_id:id});
    res.status(200).json({
        message:"notes deleted successfully",

    })
})

app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
connectDB();
app.listen(3000,()=>{
    console.log("server is running on the port 3000");
})
