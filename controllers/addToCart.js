const Prod = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 12 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOP_SECRET, {expiresIn : maxAge });
}


module.exports.addtocart_put = async(req, res, next) => {
    let prods = [];
    
    try {
        if(!req.cookies.cart) {
            prods.push(req.body.id);
            const cart = await Cart.create({products :prods});
            const token = createToken(cart._id);
            res.cookie('cart', token , {httpOnly : true , maxAge : maxAge * 1000});
            res.redirect("/");
            // res.status(201).json({cart : cart._id});
        } else {
            let theId = "";
            jwt.verify(req.cookies.cart ,  process.env.TOP_SECRET,async (err , decodedToken) => {
                if(err) {
                    console.log(err.message);
                    next();
                    
                } else {
                    theId = decodedToken.id;
                }
            })
            const thisCart = await Cart.findById(theId);
            prods = thisCart.products;
            if(!prods.includes(req.body.id)){
                prods.push(req.body.id);
            thisCart.products = prods;
            await thisCart.save();
            res.redirect("/");
            } else {
                res.redirect("/");
            }
            
            // res.status(201).json("added to cart");
    }
    } catch (err) {
        console.log(err);
        res.status(400).json( err );
    }
}

module.exports.remove_put = async(req, res, next) => {
    let remove = req.body.toRemove;
    let theId = "",indexes = [];
    try {
        jwt.verify(req.cookies.cart ,  process.env.TOP_SECRET,async (err , decodedToken) => {
            if(err) {
                console.log(err.message);
                next();
                
            } else {
                theId = decodedToken.id;
            }
        })
        const thisCart = await Cart.findById(theId);
            prods = thisCart.products;
            prods.forEach((element, index) => {
                if(element.toString() === remove ) {
                    indexes.push(index);
                }
            });
            indexes.forEach(el => {
                prods.splice(el);
            });
            thisCart.products = prods;
            await thisCart.save();
            res.redirect("/");
            // res.status(201).json("removed from cart");
        } catch (err) {
            console.log(err);
            res.status(400).json( err );
        }
}
