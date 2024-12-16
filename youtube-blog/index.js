const express=require("express");
const userRouter=require("./routes/user");
const blogRouter=require("./routes/blog");
const {connectMongoDB}=require("./connection/connect");
const cookieparser=require("cookie-parser");
const path=require("path");
const { checkForAuthenticationCookie } = require("./middileware/auth");
const Blog=require("./models/blog")
const PORT=process.env.PORT || 8000;
const app=express();

connectMongoDB(process.env.MONGO_URL || "mongodb://localhost:27017/youtube-blog-user")
.then(()=>console.log("MONGODB CONNECT"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.set(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/",async(req,res)=>{
    try {
        const allBlogs = await Blog.find(); // Fetch all blogs as an array
        res.render("home", {
            user: req.user,
            blogs: allBlogs, // Pass the array to the view
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.render("home", {
            user: req.user,
            blogs: [], // Pass an empty array if an error occurs
        });
    }
})
app.use("/user",userRouter);
app.use("/blog",blogRouter);

app.listen(PORT,()=>console.log("SERVER STARTED",PORT));