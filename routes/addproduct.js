const express = require("express");
const router = express.Router();


router.get("/addProduct", (req,res) => {
    res.render("pages/addProduct",{css :"addProduct"});
})







module.exports = router;