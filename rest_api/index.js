const fs=require("fs")
const express=require("express");
const users=require("./MOCK_DATA.json");
const { error } = require("console");
const app=express();

//middleweare : plugin
app.use(express.urlencoded({extended : false})); //get data form url to store the body

app.get("/api/",(req,res)=>{
    res.json("WELCOME TO HOME PAGE");
})
app.get("/api/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((user) =>`<li> ${user.first_name}</li>`).join()}
    </ul>
    `    
})

app
.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})
.patch((req,res)=>{
    return res.json("Status Pending");
})
.delete((req,res)=>{
    return res.json("Status pending")
})

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body, id:users.length + 1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({STATUS: "success" , id: users.length});
    })

    
})




app.listen(8001,()=>{console.log("server start")})