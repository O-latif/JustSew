const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");
const Post = require("../models/Post");
const BlogCom = require("../models/BlogCom");
const BlogRep = require("../models/BlogRep");

const {checkCart} = require("../middleware/cart");
const {checkUser} = require("../middleware/authenticate");
const addPosttController = require("../controllers/addPost");

router.get("/blog", checkUser, checkCart, async(req,res) => {
    
    
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
    let user ;
    if(res.locals.user) {
        user = res.locals.user;
        if(res.locals.user.wishlist !== "") {
            let wish = await Wish.findById(res.locals.user.wishlist);

            let  wishpro = wish.products;
            wishProducts = await product.find({ id: { $in: wishpro } });
            
        }
        
    }
    else {
        res.redirect("/login")
    }
    let posts = await Post.find().sort({createdAt : -1});
    let comments = await BlogCom.find();
    let replies = await BlogRep.find().sort({createdAt : -1});
    res.render("pages/blog",{ css :"blog", cartProd : cartArr, wish : wishProducts, posts, comments, replies, user,  title :"Blog"});
})

function saveCover1 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover1 =new Buffer.from( cover.data, "base64")
    }
}

router.post("/blog",checkUser,addPosttController.addPost) 






module.exports = router;