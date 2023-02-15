const express = require("express");
const router = express.Router();
const addtocartController = require("../controllers/addToCart");




router.put("/addToCart",addtocartController.addtocart_put);





module.exports = router;