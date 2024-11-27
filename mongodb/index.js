const fs=require("fs")
const express=require("express");
const mongosse=require("mongoose");
const { error } = require("console");
const { type } = require("os");
const { default: mongoose } = require("mongoose");
const app=express();
const port=8000;


//connection and/collection_Name
mongoose.connect("mongodb://localhost:27017/my_db")
.then(()=>console.log("Mongodb Connected"))
.catch((err)=>console.log("mongodb Error",err));

//user schema
const userschema= new mongosse.Schema({
    first_name:{
        type:String,
        require:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    gender:{
        type:String
    },
    job_title:{
        type:String,
    }

})

const User=mongoose.model("user",userschema);   //create in mongodb table_name

//middleweare : plugin
app.use(express.urlencoded({extended : false})); //get data form url to store the body

app.get("/api/",(req,res)=>{
    res.json("welcome to home page")
})
app.get("/api/users",async (req,res)=>{
    const alldbusers=await User.find({});
    const html=`
    <ul>
        ${alldbusers.map((user)=>`<li>firstname: ${user.first_name}, email: ${user.email}\n</li>`).join("")}
    </ul`;
    res.send(html);
    
})

app
.route("/api/users/:id")
.get(async (req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user)return res.status(404).json({error:"user not found"})
    return res.json(user);
})
.patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{last_name:"Ikbal Mondal"});
    return res.json("success");
})
.delete(async (req,res)=>{
    
    await User.findByIdAndDelete(req.params.id);
    res.json("success");

})

app.post("/api/users",async(req,res)=>{
    const body=req.body;

    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title 
    ){
        return res.status(400).json({msg:"All fields are require...."});
    }
    
    const result=await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        job_title:body.job_title,
    })

    return res.status(201).json({msg:"success"})
})




app.listen(port,()=>{console.log("server start",port)});