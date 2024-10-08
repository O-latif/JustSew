const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");

const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");



router.get("/women",checkCart, async (req,res) => {
    const r = await product.find({gender : 'female'}).sort({createdAt : -1});
    const N = await product.find({gender : 'female'}).sort({name : 1});
    let resultT = [];
    let resultN = [];

    if(req.body.val > 1){
        for(let i = (9 * (parseInt(req.body.val) - 1)) ; i <= (9 * parseInt(req.body.val))-1 ; i++) {
            if(r[i]){
                resultT.push(r[i]);
            }
            if(N[i]){
                resultN.push(N[i]);
            }
        }
    } else if (req.body.val == 1){
        for(let i = 1 ; i <= 9 ; i++) {
            resultT.push(r[i-1]);
            resultN.push(N[i-1]);
        }
    } else {
        if(r.length > 9 ) {
            for(let i = 1 ; i <= 9 ; i++) {
                resultT.push(r[i]);
            }
        } else {
            for(let i = 0 ; i < r.length ; i++) {
                resultT.push(r[i]);
            }
        }
        if(N.length > 9 ) {
            for(let i = 1 ; i <= 9 ; i++) {
                resultN.push(N[i]);
            }
        } else {
            for(let i = 0 ; i < N.length ; i++) {
                resultN.push(N[i]);
            }
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
    
    res.render("pages/women",{css:"" ,all : r,Tproducts : resultT,Nproducts : resultN,act : 1, cartProd : cartArr,wish : wishProducts, title : "Women"});
})




module.exports = router;