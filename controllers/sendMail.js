const { EMAIL, PASS } = process.env;
const nodemailer = require("nodemailer");
const Cart = require("../models/Cart");
const Products = require("../models/Product");

const jwt = require("jsonwebtoken");



module.exports.main = async(req, res, next) => {
  let theId = "";
  let pth = [], name = [], elems = [];
  try {
      jwt.verify(req.cookies.cart ,  process.env.TOP_SECRET,async (err , decodedToken) => {
          if(err) {
              console.log(err.message);
              next();
              
          } else {
              theId = decodedToken.id;
          }
      })
      const thisCart = await Cart.findById(theId);
          prods = thisCart.products;
          for (let i = 0; i < prods.length; i++) {
            elems[i] = await Products.findById(prods[i]);
            pth[i] = elems[i].path9;
            name[i] = elems[i].name;
          }
      const thisProd = await Products.findById(prods[0]);
      
          // res.status(201).json("removed from cart");
      } catch (err) {
          console.log(err);
          res.status(400).json( err );
      }
      for (let i = 0; i < pth.length; i++) {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth :{
            user : EMAIL, 
            pass : PASS
          },
        });
        // findPath(req, res, next);
        let info = await transporter.sendMail({
          from : `JustSew <${EMAIL}>`,
          to : 'hiidaic80@gmail.com',
          subject : "PDF FILE",
          html : 
            `<h1>${name[i]}</h1>`,
            attachments: [{
              filename: 'Pattern.pdf',
              path: pth[i],
              cid: 'JustSew@gmail.com' // Sets content ID
            }]
        });
        console.log(info.accepted); // Random ID generated after successful send (optional)
        console.log(info.rejected); // Random ID generated after successful send (optional)
      }


  
}
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'YOUR-USERNAME',
//       pass: 'THE-GENERATED-APP-PASSWORD'
//   }
// });

// send();

// async function send() {
//   const result = await transporter.sendMail({
//       from: 'YOUR-USERNAME',
//       to: 'RECEIVERS',
//       subject: 'Hello World',
//       text: 'Hello World'
//   });

//   console.log(JSON.stringify(result, null, 4));
// }