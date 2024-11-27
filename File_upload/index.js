const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 8000;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/fileuploads")
.then(()=>console.log("MongoDB connected"));


// Define schema and model
const ImageSchema = new mongoose.Schema({
  name:String,
  data: String, // Base64 string
  contentType: String,
});
const Image = mongoose.model("Image", ImageSchema);

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.json());



app.get("/", async (req, res) => {
  const images = await Image.find(); // Fetch all uploaded images
  res.render("home", { images });
});


app.post("/uploads", upload.single("profileName"), async (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  // Convert file to Base64
  const fileData = fs.readFileSync(filePath);
  const base64String = fileData.toString("base64");

  // Save to MongoDB
  const newImage = new Image({
    name: req.file.originalname,
    data: base64String,
    contentType: req.file.mimetype,
  });
  await newImage.save();
  return res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
    const imageId = req.params.id;
  
    try {
      const image = await Image.findById(imageId);
      if (!image) {
        return res.status(404).send("Image not found");
      }
  
      // Delete image document from MongoDB
      await Image.findByIdAndDelete(imageId);
      console.log("Image deleted successfully");
      return res.redirect("/");
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).send("Error deleting image");
    }
  });
  
// Fetch and display an image
app.get("/image/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).send("Image not found");

  res.contentType(image.contentType);
  res.send(Buffer.from(image.data, "base64"));
});

app.listen(PORT, () => console.log("Server started on port", PORT));
