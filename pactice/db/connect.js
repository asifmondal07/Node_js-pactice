const mongoose= require("mongoose")

function mongoDbConnect(url){
    return mongoose.connect(url)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log("MongoDb Err ",err))

}

module.exports={mongoDbConnect}