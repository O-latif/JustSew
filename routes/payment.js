const express = require("express");
const router = express.Router();
const product = require("../models/Product");
const Cart = require("../models/Cart");
const Wish = require("../models/Wishlists");

const sendMail = require('../controllers/sendMail')

const {checkCart} = require("../middleware/cart");
const {checkUser} = require("../middleware/authenticate");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const paypal = require("../paypal-api")

router.get("/payment", checkCart,checkUser, async(req,res) => {
    
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
  res.render("pages/payment",{css :"payment", cartProd : cartArr,wish : wishProducts,  title :"Payment", pplId : PAYPAL_CLIENT_ID});
})

function saveCover1 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover1 =new Buffer.from( cover.data, "base64")
    }
}


// For a fully working example, please see:
// https://github.com/paypal-examples/docs-examples/tree/main/standard-integration


const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};



// create a new order
router.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const total = req.body.total;
    const order = await paypal.createOrder(total);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message)
  }
});

router.post("/payment", (req,res,next) => {
  if(req.body.send === 'true') {
    sendMail.main(req,res,next).catch(err => console.log("err : ",err));

  }
})



module.exports = router;