const express = require("express");
const { handelAllUser,
        findById,
        updateByUserId,
        deleteByUserId,
        addedDataDB
    }=require ("../controllers/user")


const router=express.Router();



router.route("/").get(handelAllUser).post(addedDataDB);        //get and post one line for req path same

router
.route("/:id")
.get(findById)
.patch(updateByUserId)
.delete(deleteByUserId);


module.exports=router;
