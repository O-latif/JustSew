const jwt = require("jsonwebtoken")
const User = require("../models/User")
const dotenv = require('dotenv');
dotenv.config();

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token ,  process.env.TOP_SECRET, (err , decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect("/login");
                
            } else {
                next();
            }
        })
    }else {
        res.redirect("/login");
    }
}


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token ,  process.env.TOP_SECRET,async (err , decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
                
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
                next();
    }
}



module.exports ={ requireAuth , checkUser}