const Prod = require("../models/Product");
const Wish = require("../models/Wishlists");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const maxAge = 12 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOP_SECRET, {expiresIn : maxAge });
}


module.exports.addtowish_put = async(req, res, next) => {
    let prods = [];
    
    try {
        prods.push((req.body.wishId).trim());
        const wish = await Wish.create({products :prods});
        const tokenU = req.cookies.jwt;
        
        
            
            // const token = createToken(wish._id);
            
            
            if(tokenU) {
                jwt.verify(tokenU ,  process.env.TOP_SECRET,async (err , decodedToken) => {
                    if(err) {
                        console.log(err.message);
                        res.locals.user = null;
                        next();
                        
                    } else {
                        let user = await User.findById(decodedToken.id);
                        if(user.wishlist === ""){
                            user = await User.findByIdAndUpdate(decodedToken.id,
                                {
                                    $set : {
                                        wishlist : wish._id
                                    }
                                }
                            );
                            res.locals.user = user;
                            next();
                        } else {
                            let theId = user.wishlist;
                            
                            const thisWish = await Wish.findById(theId);
                            prods = thisWish.products;
                            
                            if(!prods.includes((req.body.wishId).trim())){
                                prods.push((req.body.wishId).trim());
                                thisWish.products = prods;
                                await thisWish.save();
                                res.redirect("/");
                            } else {
                                res.redirect("/");
                            }
                            
                            // res.status(201).json("added to cart");
                        }
                        
                    }
                })
            }
            // res.cookie('wish', token , {httpOnly : true , maxAge : maxAge * 1000});
            
            
            
    
    } catch (err) {
        console.log(err);
        res.status(400).json( err );
    }
}

module.exports.removewish_put = async(req, res, next) => {
    let remove = req.body.wishRemove;
    let theId ,indexes = [];
    const tokenU = req.cookies.jwt;
    try {
        if(tokenU) {
            await jwt.verify(tokenU ,  process.env.TOP_SECRET,async (err , decodedToken) => {
                if(err) {
                    console.log(err.message);
                    next();
                    
                } else {
                    let user = await User.findById(decodedToken.id);
                    theId = user.wishlist;
                }
            })
        }
        const thisWish = await Wish.findById(theId);
        prods = thisWish.products;
            prods.forEach((element, index) => {
                if(element.toString() === remove ) {
                    indexes.push(index);
                }
            });
            indexes.forEach(el => {
                prods.splice(el,1);
            });
            thisWish.products = prods;
            await thisWish.save();
            res.redirect(req.body.location4);
            // res.status(201).json("removed from cart");
        } catch (err) {
            console.log(err);
            res.status(400).json( err );
        }
}
