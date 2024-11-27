const mongosse=require("mongoose");


async function connectmongodb(url){
   return mongosse.connect(url)
   .then(()=>console.log("Mongodb Connected"))
   .catch((err)=>console.log("mongodb Error",err));
   
}
module.exports={
    connectmongodb,
}
    
