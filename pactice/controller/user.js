const {setUser}=require("../service/auth")
const User=require("../model/user")


async function handelSignUp(req,res){
    try {
        console.log(req.files);
        console.log(req.body);
        const {name,email,phone,password}=req.body
        let availableslots=5;
        let profileImage=[];
        if(req.files && req.files.length > 0){
            if(req.files.length>availableslots){
                 return res.status(400).json({ message: `You can upload only ${availableslots} images.` });
            }else{
                profileImage=req.files.map((file)=>file.filename)
            }
        }
       
    

        if(!name || !email || !phone || !password){
            return res.status(400).json({message:"All Field Are Requied"})
        }

        const user=await User.create({
            name:name,
            email:email,
            phone:phone,
            password:password,
            profileImage:profileImage
        })

        res.status(200).json({message:"SignUp SuccesFully ",user})
    } catch (error) {
        console.error("SignUp Error ",error);
       res.status(500).json({ error: error.message });
    }
} 

async function handelSignIn(req,res){

    const {phone,email,password }=req.body;

    let getuser

    if(phone){
        getuser=await User.findOne({phone})
    }else if(email){
        getuser=await User.findOne({email})
    }else{
         return res.status(400).json({ message: "Phone or Email is required" });
    }

  
    if(!getuser){
        return res.status(400).json({ message: "Invalid Email Or Phone" });
    }


    if(password !== getuser.password){
        return res.status(400).json({ message: "Invalid Password" });
    }

    const token=setUser(getuser);

    return res.status(201).json({
        name:getuser.name,
        message:"Your Login Succecfully",
        token:token
    })
}

async function handelUserProfile(req,res){
    console.log(req.user._id,"user ID 1")
    const userId=req.user._id;
    console.log(userId, "user id 2")

    const {name,email,phone,role}=req.body

    const getuser=await User.findById(userId._id)

    if(!getuser){
        return res.status(404).json({message:"User Not Find Please Again Login"})
    }

    getuser.name=name || getuser.name;
    getuser.email=email || getuser.email
    getuser.phone=phone || getuser.phone;
    getuser.role=role || getuser.role;

    await getuser.save();

    return res.status(202).json({
        message:"User Profile Update Success",
        getuser:{
            name:getuser.name,
            email:getuser.email,
            phone:getuser.phone,
            role:getuser.role
        }
    })
}

module.exports={handelSignUp,handelSignIn,handelUserProfile}