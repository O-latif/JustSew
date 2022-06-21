const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = 'mongodb://127.0.0.1:27017';//ki tbadlah ma t7otahch f github i'll wait for you kana allah i 3awnik
mongoose.connect(url ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 5000))
    .catch((err) => console.log(err));

app.set('view engine' , 'ejs');
app.set('views', __dirname + '/views');
app.set('layout' , 'layouts/layout'); // possible delete 
app.use(expressLayout);
app.use(express.static("public"));

const homeRouter = require("./routes/home");
const contactRouter = require("./routes/contact");








app.use("/" , homeRouter);
app.use("/" , contactRouter);