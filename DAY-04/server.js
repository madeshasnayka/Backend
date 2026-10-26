const app =require("./src/app")
let notes=[]
app.get('/',(req,res)=>{
    res.send("notes app")
})
app.post('/notes',(req,res)=>{
    res.send("notes get created").status(200)
      notes.push(req.body)
      console.log(notes)
})

app.get('/notes',(req,res)=>{
   res.send(notes)
})
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send("notes get deleted").status(200)
})

app.patch('/notes/:index',(req,res)=>{
     notes[req.params.index].description=req.body.description;
     res.send("notes get updated");
})
app.listen(3000,()=>{
    console.log("server is running on the port 3000");
})