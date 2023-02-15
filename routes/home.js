const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");

const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");
const delController = require("../controllers/deleteItem");



router.get("/",checkCart, async (req,res) => {
    const r = await product.find().sort({createdAt : -1});
    const N = await product.find().sort({name : 1});

    let resultT = [];
    let resultN = [];

        for(let i = 0 ; i < r.length ; i++) {
            resultT.push(r[i]);
        }

        for(let i = 0 ; i < N.length ; i++) {
            resultN.push(N[i]);
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
            wishProducts = await product.find({ _id: { $in: wishpro } });
        }
    }
    res.render("pages/index",{css:"" ,all : r, Tproducts : resultT,Nproducts : resultN,act : 1, cartProd : cartArr,wish : wishProducts, title : "Sewing Patterns"});
})


router.put("/",delController.delItem);

module.exports = router;