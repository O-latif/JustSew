const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/authController")




router.get("/login", (req, res) => {
    res.render("pages/login" , {title : "Connexion" , css : "login"})
}) 
// router.post("/login",AuthController.login) 

router.get("/sign-up",(req, res) => {
    res.render("pages/sign-up" , {title : "Inscription" , css : "sign-up"})
})
// router.post("/sign-up",AuthController.register)
// router.get("/logout",AuthController.logout)



module.exports = router