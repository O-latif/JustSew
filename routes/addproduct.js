const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");

const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");
const prod = require("../controllers/addProduct")

router.get("/addProduct", checkCart, async(req,res) => {
    
    var cartArr = [];
    let wishProducts = [];

    if(res.locals.locart) {
        const cartProducts = res.locals.locart.products;
        // console.log(cartProducts[0].toString());
        
        var elm;
        var theId;
        
        if(cartProducts.length >= 1) {
            for(let i = 0 ; i < cartProducts.length ; i++) {
                theId = cartProducts[i].toString();
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
    res.render("pages/addProduct",{css :"addProduct", cartProd : cartArr,wish : wishProducts,  title :"Add Product"});
        
    
})
router.post("/addProduct",prod.addProduct) 

module.exports = router;