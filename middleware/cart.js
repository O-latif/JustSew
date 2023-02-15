const jwt = require("jsonwebtoken")
const Cart = require("../models/Cart")
const dotenv = require('dotenv');
dotenv.config();


const checkCart = (req, res, next) => {
    const token = req.cookies.cart;

    if(token) {
        jwt.verify(token ,  process.env.TOP_SECRET,async (err , decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.locart = null;
                next();
                
            } else {
                let cart = await Cart.findById(decodedToken.id);
                res.locals.locart = cart;
                next();
            }
        })
    } else {
        res.locals.locart = null;
                next();
    }
}



module.exports ={checkCart}