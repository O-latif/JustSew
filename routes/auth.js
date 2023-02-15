const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

const {checkCart} = require("../middleware/cart");



router.get("/login",checkCart, AuthController.login_get );
router.post("/login",AuthController.login_post); 

router.get("/sign-up",checkCart, AuthController.signUp_get);
router.post("/sign-up",AuthController.signUp_post);

router.get("/logout",AuthController.logout_get)



module.exports = router