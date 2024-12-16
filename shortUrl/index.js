const express=require("express");
const URLrouter=require("./routes/url")

const {connectMongodb}=require("./connection/connect")

const app=express();

const PORT =8000;


connectMongodb("mongodb://localhost:27017/short-url").then(()=>console.log("connected mongodb"));

app.use(express.json());

app.use("/url",URLrouter);

app.listen(PORT,()=> console.log("SERVER START",PORT))