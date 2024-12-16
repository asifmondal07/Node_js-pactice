const cluster=require("cluster");
const os=require("os");
const express=require("express");



const cpucore=os.cpus().length;

if(cluster.isPrimary){
    for(i=0;i<cpucore;i++){
        cluster.fork();
    }
}else{
    const PORT=8000;
    const app=express();
        
    app.get("/",(req,res)=>{
        return res.json({
            message:`Hello Forom Express server ${process.pid}`});
    });

    app.listen(PORT,()=>console.log("server Started ",PORT));
}






