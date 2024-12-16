const { Router } = require("express");
const multer=require("multer");
const path=require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + '-' + file.originalname);
    }
  })
  
const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    });
})

router.get("/:id",async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    // Use findOne to query based on blogId
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

console.log("comments",comments);
    return res.render("blog",{
        user:req.user,
        comments,
        blog,
    })
});

router.post("/",upload.single("coverimage"),async(req,res)=>{
    const {title,body}=req.body;
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverimage:`/uploads/${req.file.filename}`,

    })
    return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId",async(req,res)=>{
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});

module.exports= router;