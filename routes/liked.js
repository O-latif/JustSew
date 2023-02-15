const express = require("express");
const router = express.Router();
const {checkUser } = require("../middleware/authenticate");
const deleteController = require("../controllers/deleteItem");
const Post = require("../models/Post");


router.put("/liked",checkUser ,async(req , res)=> {

    if(parseInt(req.body.val) == 1) {
        await Post.findByIdAndUpdate(req.body.postId, {
                $push:{liked:res.locals.user.id}
            }, {
                new : true
            }).exec((err , result)=>{
                if(err) {
                    return res.status(422).json({error:err});
                    
                }
            })
    } else if (parseInt(req.body.val) == -1) {
        await Post.findByIdAndUpdate(req.body.postId, {
            $pull:{liked:res.locals.user.id}
        }, {
            new : true
        }).exec((err , result)=>{
            if(err) {
                return res.status(422).json({error:err});
                
            }
        })
    }
    
});



module.exports = router;