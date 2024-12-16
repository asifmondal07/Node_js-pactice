const { randomBytes, createHmac } = require("crypto");
const { Schema, model } = require("mongoose");
const {createToken}=require("../services/auth")

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageUrl: {
            type: String,
            default: "/images/deafult.jpg",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;

    // Check if password is modified
    if (!user.isModified("password")) {
        return next();
    }

    // Generate a salt with a proper encoding
    const salt = randomBytes(12).toString("hex");

    // Hash the password with the generated salt
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    // Set the salt and hashed password on the user document
    user.salt = salt;
    user.password = hashedPassword;
    console.log(hashedPassword);
    // Proceed to the next middleware
    next();
});

userSchema.static("matchPasswordAndGenarateToken",async function(email,password){
    const user=await this.findOne({email});
    if(!user)throw new Error("User Not Found");
    const salt=user.salt;
    const hashedPassword=user.password;

    const userProviedHashed=createHmac("sha256", salt)
    .update(password)
    .digest("hex");
    if(hashedPassword !== userProviedHashed)throw new Error("incorret password");
    const token=createToken(user);
    return token;
})

const User = model("user", userSchema);

module.exports = User;
