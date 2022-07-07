const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


dotenv.config();
const url = process.env.MONGO_URL;//ki tbadlah ma t7otahch f github i'll wait for you kana allah fi 3awnik
mongoose.connect(url ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 5000))
    .catch((err) => console.log(err));

    

app.set('view engine' , 'ejs');
app.set('views', __dirname + '/views');
app.set('layout' , 'layouts/layout'); // possible delete 
app.use(expressLayout);
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit : '10mb', extended : false}));
app.use(bodyParser.json())
app.use(cookieParser());




const homeRouter = require("./routes/home");
const contactRouter = require("./routes/contact");
const authRouter = require("./routes/auth");
const dprodRouter = require("./routes/addproduct");


app.use("/" , authRouter);
app.use("/" , homeRouter);
app.use("/" , contactRouter);
app.use("/" , dprodRouter);