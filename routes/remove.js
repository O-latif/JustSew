const express = require("express");
const router = express.Router();
const addtocartController = require("../controllers/addToCart");



router.put("/remove",addtocartController.remove_put);





module.exports = router;