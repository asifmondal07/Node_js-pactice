const express=require("express")
const {mongoDbConnect}=require("./db/connect")
const userRouter=require("./router/user")
const cors = require('cors');

const app=express()
const PORT=3000;

mongoDbConnect("mongodb://localhost:27017/newProject")


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', //allow requests from this origin 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies to be sent with the request (if needed)
})); //handle CORS requests

app.use("/user",userRouter)
app.listen(PORT,()=>console.log("Server Started ",PORT))