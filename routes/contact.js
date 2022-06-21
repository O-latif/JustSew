const express = require("express");
const router = express.Router();


router.get("/contact", (req,res) => {
    res.render("pages/contact",{css :"contact"});
})







module.exports = router;