const express = require("express");
const router = express.Router();
const addtoWishController = require("../controllers/addToWish");




router.put("/addToWishlist",addtoWishController.addtowish_put);





module.exports = router;