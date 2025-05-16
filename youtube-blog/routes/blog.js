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
  });


  
const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    });
})

router.get("/:id",async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    // Use find to query based on blogId
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

console.log("comments",comments);
    return res.render("blog",{
        user:req.user,
        comments,
        blog,
    })
});

router.post("/", upload.single("coverimage"), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { title, body } = req.body;

        if(!title || !body){return res.status(400).json({message:"Require All all details"})}

        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverimage: `/uploads/${req.file.filename}`,
        });

        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
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