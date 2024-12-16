
const express=require("express");
const fs=require("fs");
const zlib = require('zlib');

const PORT=8000;
const app=express();

fs.createReadStream("./txt.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./txt.zip")));

app.get("/",(req,res)=>{
    const streams=fs.createReadStream("./txt.txt","utf-8");
    streams.on("data",(chunk)=>{res.write(chunk)});
    streams.on("end",()=>res.end());
})


app.listen(PORT,()=>console.log("Server Started",PORT));    