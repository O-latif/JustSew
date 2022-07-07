const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


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

module.exports.login_get = (req, res) => {
    res.render("pages/login" , {title : "Connexion" , css : "login"});
}

module.exports.signUp_get = (req, res) => {
    res.render("pages/sign-up" , {title : "Inscription" , css : "sign-up"});
}
module.exports.signUp_post = async(req, res) => {
    const {fname, lname, email, mdp} = req.body;
    console.log(fname,lname,email,mdp);

    try {
        const user = await User.create({fname, lname, email, mdp});
        const token = createToken(user._id);
        res.cookie('jwt', token , {httpOnly : true , maxAge : maxAge * 1000});
        res.status(201).json({user : user._id});
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