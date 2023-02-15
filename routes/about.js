const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");

const {checkCart} = require("../middleware/cart");
const addtocartController = require("../controllers/addToCart");

router.get("/about", checkCart, async(req,res) => {
    
    var cartArr = [];
    let wishProducts = [];
    if(res.locals.locart) {
        const cartProducts = res.locals.locart.products;
        
        var elm = [];
        var theId;
        
        if(cartProducts.length >= 1) {
            for(let i = 0 ; i < cartProducts.length ; i++) {
                theId = cartProducts[i].toString();
                // cartArr = await product.find({ id: { $in: elm } });
                elm = await product.findById(theId);
                cartArr.push(elm);
            }
        }
        
    }
    if(res.locals.user) {
        if(res.locals.user.wishlist !== "") {
            let wish = await Wish.findById(res.locals.user.wishlist);

            let  wishpro = wish.products;
            wishProducts = await product.find({ id: { $in: wishpro } });
            
        }
        
    }
    res.render("pages/about",{css :"about", cartProd : cartArr,wish : wishProducts,  title :"About"});
})







module.exports = router;