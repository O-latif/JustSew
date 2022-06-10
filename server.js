const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

app.set('view engine' , 'ejs');
app.set('views', __dirname + '/views');
app.set('layout' , 'layouts/layout'); // possible delete 
app.use(expressLayout);
app.use(express.static("public"));