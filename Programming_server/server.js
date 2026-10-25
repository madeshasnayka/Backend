const express=require("express");
const port= process.env.PORT || 3000;
const path=require("path")
const app=express()
app.get('/',(req,res)=>{
    res.send("Welcome user",200);
})
app.get('/about',(req,res)=>{
    res.send("this is about page");
})
app.get('/login',(req,res)=>{
    res.send("this is login page");
})
app.get('/logout',(req,res)=>{
    res.send("this is logout page");
})
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, '404.html')
    );
});
app.listen(port,()=>{
    console.log(`the server is running in the port ${port}.`)
})