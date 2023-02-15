const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");
const {checkCart} = require("../middleware/cart")
const addtocartController = require("../controllers/addToCart");

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { fname :"", lname:"", email:"", mdp:""};

    // incorrect email
    if(err.message === "incorrect email !") {
        errors.email = "That email is not registred";
    }

    // incorrect password
    if(err.message === "incorrect password !") {
        errors.mdp = "That password is incorrect";
    }

    //duplicate email 
    if(err.code === 11000) {
        errors.email = "That email is already registred";
        return errors;
    }

    //validation errors 
    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOP_SECRET, {expiresIn : maxAge });
}

module.exports.login_get = async (req, res) => {
    var cartArr = [];
    let wishProducts = [];

    if(res.locals.locart) {
        const cartProducts = res.locals.locart.products;
        // console.log(cartProducts[0].toString());
        
        var elm;
        var theId;
        
        if(cartProducts.length >= 1) {
            for(let i = 0 ; i < cartProducts.length ; i++) {
                console.log("cart products : " + cartProducts[i])
                theId = cartProducts[i].toString();
                elm = await product.findById(theId);
                cartArr.push(elm);
            }
        }
        
    }
    if(res.locals.user) {
        let wish = await Wish.findById(res.locals.user.wishlist);
        let wishpro = wish.products;
        var el;
        var Id;
        for(let i = 0 ; i< wishpro.length ; i++) {
            Id = wishpro[i];
            el = await product.findOne({id : Id});
            wishProducts.push(el);
        }
        
    }
    res.render("pages/login" , {title : "Login" , cartProd : cartArr,wish : wishProducts,  css : "login"});
}

module.exports.signUp_get = async (req, res) => {
    const result = await product.find().limit(8);
    var cartArr = [];
    let wishProducts = [];
    if(res.locals.locart) {
        const cartProducts = res.locals.locart.products;
        // console.log(cartProducts[0].toString());
        
        var elm;
        var theId;
        
        if(cartProducts.length >= 1) {
            for(let i = 0 ; i < cartProducts.length ; i++) {
                console.log("cart products : " + cartProducts[i])
                theId = cartProducts[i].toString();
                elm = await product.findById(theId);
                cartArr.push(elm);
            }
        }
        
    }
    if(res.locals.user) {
        let wish = await Wish.findById(res.locals.user.wishlist);
        let wishpro = wish.products;
        var el;
        var Id;
        for(let i = 0 ; i< wishpro.length ; i++) {
            Id = wishpro[i];
            el = await product.findOne({id : Id});
            wishProducts.push(el);
        }
        
    }
    res.render("pages/sign-up" , {title : "Sign up" , cartProd : cartArr,wish : wishProducts,  css : "sign-up"});
}
module.exports.signUp_post = async(req, res) => {
    const {fname, lname, email, mdp} = req.body;
    
    try {
        const user = await User.create({fname, lname, email, mdp});
        const token = createToken(user._id);
        res.cookie('jwt', token , {httpOnly : true , maxAge : maxAge * 1000});
        // res.status(201).json({user : user._id});
        res.redirect("/");
    }catch (err) {
        let errors = handleErrors(err);
        res.status(400).json( {errors} );
    }
}
module.exports.login_post = async(req, res) => {
    const {logemail, logpwd} = req.body;
    
    try {
        const user = await User.login(logemail, logpwd);
        const token = createToken(user._id);
        res.cookie('jwt', token , {httpOnly : true , maxAge : maxAge * 1000});
        
        res.status(200).json({ user : user._id});

    } catch(err) {
        let errors = handleErrors(err);
        res.status(400).json( {errors} );
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("jwt" , "", {maxAge : 1});
    res.redirect("/");
}
