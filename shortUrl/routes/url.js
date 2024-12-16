const express=require("express");
const {handelGenarateShorteUrl,
    handelRedirecturl,
    handelanalytics
}=require("../controllers/url")


const router=express.Router();

router.post(("/"),handelGenarateShorteUrl);
router.get(("/:shortId"),handelRedirecturl);
router.get(("/analytics/:shortId"),handelanalytics);

module.exports=router;