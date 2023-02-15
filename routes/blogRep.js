const express = require("express");
const router = express.Router();
const product = require("../models/Product");

const Reply = require("../models/BlogRep");
const {checkUser } = require("../middleware/authenticate");

const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");

router.post("/blogRep",checkUser ,async (req,res) => {
    if(res.locals.user) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        const com =  new Reply({
            userId  :res.locals.user.id,
            userFName  :res.locals.user.fname,
            userLName  :res.locals.user.lname,
            comId  : req.body.comId,
            content :req.body.comment ,
            date : today
        })
        com.save();
        
        
        res.redirect(`/blog`)
    } else {
        res.redirect(`/login`)
    }
    
})

module.exports = router;