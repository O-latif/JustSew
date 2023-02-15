const express = require("express");
const router = express.Router();
const addtocwishController = require("../controllers/addToWish");
const product = require("../models/Product");

router.post("/search", async(req,res) => {
    let payload = req.body.payload.trim();
    let goto = await product.findOne({_id : req.params.id})
    let search = await product.find( {$or:[ {name : {$regex : new RegExp('^'+payload+'.*','i')}}]}).exec();
    search = search.slice(0, 8);
    res.send({payload: search , go : goto});

})

module.exports = router;