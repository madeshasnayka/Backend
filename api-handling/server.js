const express=require("express")
const app=express()
const PORT=process.env.PORT||3000;
app.use(express.json());
let notes=[];
app.get('/',(req,res)=>{
    res.send("NOTES app").status(200);
})

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
res.send('notes created').status(200);
})
app.get('/notes',(req,res)=>{
    res.send(notes).status(200)
})
app.listen(PORT,()=>{
    console.log(`the server is running on the port ${PORT}`);
})