const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/authController")




router.get("/login", AuthController.login_get );
router.post("/login",AuthController.login_post); 

router.get("/sign-up",AuthController.signUp_get);
router.post("/sign-up",AuthController.signUp_post);
// router.get("/logout",AuthController.logout)



module.exports = router