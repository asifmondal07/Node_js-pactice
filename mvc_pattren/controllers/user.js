const user=require("../models/user");

async function handelAllUser(req,res){
    
        const alldbusers=await user.find({});
        const html=`
        <ul>
            ${alldbusers.map((user)=>`<li>firstname: ${user.first_name}, email: ${user.email}\n</li>`).join("")}
        </ul`;
        res.send(html);
}
async function findById(req,res){
    const User=await user.findById(req.params.id);
    if(!User)return res.status(404).json({error:"user not found"})
    return res.json(User);
}

async function updateByUserId(req,res){
    await user.findByIdAndUpdate(req.params.id,{last_name:"IKBAL MONDAL"})
    return res.json("success")
}

async function deleteByUserId(req,res){
    await user.findByIdAndDelete(req.params.id)
    return res.json("success");
}

async function addedDataDB(req,res){

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
    
    const result=await user.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        gender:body.gender,
        job_title:body.job_title,
    })

    return res.status(201).json({msg:"success"})
}



module.exports={
    handelAllUser,
    findById,
    updateByUserId,
    deleteByUserId,
    addedDataDB

}