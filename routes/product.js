const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");
const Comment = require("../models/Comments");
const {checkUser } = require("../middleware/authenticate");

const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");

router.get("/product/:id",checkCart,async (req,res) => {
    const result = await product.findById(req.params.id);
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
            wishProducts = await product.find({ _id: { $in: wishpro } });
        }
    }
    let comments =await Comment.find({prodId : req.params.id });
    
    let notes = [];
        comments.forEach(com => {
            notes.push(com.note);
        });
        let moy = 0;
        let sum = notes[0];
        if(notes.length === 1) {
            moy = sum;
        }
        
        if(notes.length > 1) {
            sum = notes.reduce(function(acc, cur,ind, arr) {
                return acc + cur;
            })
            moy = Math.round(sum / notes.length);
        }
    res.render("pages/product",{css :"product",prod : result, cartProd : cartArr,wish : wishProducts,comments ,moyen : moy ,  title : "product"});
})
router.put("/product/:id",checkUser ,async (req,res) => {
    if(res.locals.user) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();


        today = dd + '/' + mm + '/' + yyyy;
        const com =  new Comment({
            userId  :res.locals.user.id,
            userFName  :res.locals.user.fname,
            userLName  :res.locals.user.lname,
            prodId  : req.params.id,
            note: req.body.note,
            content:req.body.description ,
            date : today
        })
        com.save();

        let comments = await Comment.find({prodId : req.params.id });
        comments.push(com)

        let notes = [];
        comments.forEach(com => {
            notes.push(com.note);
        });
        
        let sum = 0;
        let moy = 0;
        if(notes.length > 1) {
            sum = notes.reduce(function(acc, cur,ind, arr) {
                return acc + cur;
            })
            console.log('sum is : ',sum)
            moy = Math.round(sum / notes.length);
        } else if (notes.length === 1 ){
            console.log('sum is : ',notes[0])
            moy = notes[0]
        }
        
        
        const pro = await product.findById(req.params.id);
        pro.moyen = moy;
        pro.reviews = pro.reviews + 1;
        pro.save();
        
        res.redirect(`/product/${req.params.id}`)
    } else {
        res.redirect(`/login`)
    }
    
})

module.exports = router;