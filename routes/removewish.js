const express = require("express");
const router = express.Router();
const addtocwishController = require("../controllers/addToWish");



router.put("/removewish",addtocwishController.removewish_put);





module.exports = router;