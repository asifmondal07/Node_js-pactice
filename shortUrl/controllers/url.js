const shortid=require("shortid");
const URL=require("../models/url");


async function handelGenarateShorteUrl(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:"url is require"});

    const shortId=shortid(8);
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visittory:[],
    })
    console.log(body.url)
    return res.json({id:shortId});0
}

async function handelRedirecturl(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
            shortId,
        },{
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                }
            }
        }, { new: true } // Return the updated document
    );
    // Handle case where no entry is found
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
    res.redirect(entry.redirectURL)
}

async function handelanalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory,
        });

} 

module.exports={
    handelGenarateShorteUrl,
    handelRedirecturl,
    handelanalytics,
}