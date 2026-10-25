const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"public/pages/home.html")
    );
});

app.get("/about",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"public/pages/about.html")
    );
});

app.get("/login",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"public/pages/login.html")
    );
});

app.get("/logout",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"public/pages/logout.html")
    );
});

app.use((req,res)=>{
    res.status(404).sendFile(
        path.join(__dirname,"public/pages/404.html")
    );
});
app.listen(port,()=>{
    console.log(`the server is running in the port${port}`)
})