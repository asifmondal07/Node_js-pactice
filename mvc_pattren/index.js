
const express=require("express");
const {connectmongodb}=require("./connection/connection")
const { error } = require("console");
const { type } = require("os");
const mongoose=require("mongoose")
const app=express();
const {middleWare}=require("./middileWare")
const router=require("./routes/user")

const port=8000;


//connection and/collection_Name
connectmongodb("mongodb://localhost:27017/my_db")

//middleweare : plugin
app.use(express.urlencoded({extended : false})); //get data form url to store the body
app.use(middleWare("log.txt"));

//router
app.get("/api/",(req,res)=>{res.json("WELCOME TO HOME PAGE")});     //home page
app.use("/api/user",router);



app.listen(port,()=>{console.log("server start",port)});