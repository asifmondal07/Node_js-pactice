const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if all required fields are provided
        if (!fullname || !email || !password) {
            return res.status(400).send("All fields are required!");
        }

        // Create the user
        const newUser = await User.create({
            fullname,
            email,
            password, // This will be hashed in the Mongoose pre-save hook
        });

        // Redirect to homepage or success page
        return res.redirect("/");
    } catch (error) {
        console.error("Error creating user:", error);

        // Handle specific Mongoose errors
        if (error.name === "ValidationError") {
            return res.status(400).send("Validation failed: " + error.message);
        }

        return res.status(500).send("Internal server error");
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenarateToken(email, password); // Use `await` here
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin",{
           error:"Incorect Password",
        });
        
        
    }
   
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports = router;
