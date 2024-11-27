const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    return res.send("WElcome to home page");
});
app.get("/about",(req,res)=>{
    return res.send("Hey "+ req.query.name + " Your Age Is "  + req.query.age);
})
app.listen(8000,()=>{console.log("server started")});