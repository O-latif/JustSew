const express = require("express");
const router = express.Router();
const {checkUser } = require("../middleware/authenticate");
const deleteController = require("../controllers/deleteItem");


router.post("/delete_product",checkUser ,deleteController.delItem);


module.exports = router;