const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");
const {checkUser } = require("../middleware/authenticate");


const {checkCart} = require("../middleware/cart")

router.post("/numerating",checkUser,checkCart, async (req,res) => {
    const r = await product.find().sort({createdAt : -1});
    const N = await product.find().sort({name : 1});
    let resultT = [];
    let resultN = [];
    let p = 1 ;
    if(req.body.val > 1){
        for(let i = (3 * (parseInt(req.body.val) - 1)) ; i <= (3 * parseInt(req.body.val))-1 ; i++) {
            if(r[i]){
                resultT.push(r[i]);
            }
            if(N[i]){
                resultN.push(r[i]);
            }
        }
    } else if (req.body.val == 1){
        for(let i = 1 ; i <= 3 ; i++) {
            resultT.push(r[i-1]);
            resultN.push(N[i-1]);
        }
    }

    var cartArr = [];
    let wishProducts = [];
    if(res.locals.locart) {
        const cartProducts = res.locals.locart.products;
        
        
        var elm = [];
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
    
    res.render("../index",{css:"" ,all : r, Tproducts : resultT,Nproducts : resultN,act : req.body.val, cartProd : cartArr,wish : wishProducts, title : "Sewing Patterns"});
})

module.exports = router;