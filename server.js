const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { requireAuth,checkUser } = require("./middleware/authenticate")
const {checkCart} = require("./middleware/cart")
var methodOverride = require('method-override')

// override with POST having ?_method=PUT
app.use(methodOverride('_method'));

dotenv.config();
// const url = process.env.MONGO_URL;//ki tbadlah ma t7otahch f github i'll wait for you kana allah fi 3awnik
const url = 'mongodb://127.0.0.1:27017';
mongoose.connect(url ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 5000))
    .catch((err) => console.log(err));

    

app.set('view engine' , 'ejs');
app.set('views', __dirname + '/views');
app.set('layout' , 'layouts/layout'); // possible delete 
app.use(expressLayout);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit : '50mb', extended : false}));
app.use(bodyParser.json())
app.use(cookieParser());




const homeRouter = require("./routes/home");
const contactRouter = require("./routes/contact");
const aboutRouter = require("./routes/about");
const authRouter = require("./routes/auth");
const dprodRouter = require("./routes/addproduct");
const prodRouter = require("./routes/product");
const addToCartRouter = require("./routes/addToCart");
const addToWishRouter = require("./routes/addToWishlist");
const removeRouter = require("./routes/remove");
const removewishRouter = require("./routes/removewish");
const numRouter = require("./routes/numerating");
const menRouter = require("./routes/men");
const womenRouter = require("./routes/women");
const boysRouter = require("./routes/boys");
const girlsRouter = require("./routes/girls");
const delRouter = require("./routes/delItems");
const blgRouter = require("./routes/blog");
const blgComRouter = require("./routes/blogCom");
const blgRepRouter = require("./routes/blogRep");
const likeRouter = require("./routes/liked");
const searchRouter = require("./routes/search");

app.get("*",checkUser,checkCart)
app.use("/" , authRouter);
app.use("/" , homeRouter);
app.use("/" , contactRouter);
app.use("/" , dprodRouter);
app.use("/" , prodRouter);
app.use("/" , aboutRouter);
app.use("/" , addToCartRouter);
app.use("/" , addToWishRouter);
app.use("/" , removeRouter);
app.use("/" , removewishRouter);
app.use("/" , numRouter);
app.use("/" , menRouter);
app.use("/" , searchRouter);
app.use("/" , womenRouter);
app.use("/" , boysRouter);
app.use("/" , girlsRouter);
app.use("/" , delRouter);
app.use("/" , blgRouter);
app.use("/" , blgComRouter);
app.use("/" , blgRepRouter);
app.use("/" , likeRouter);