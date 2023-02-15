const Product = require("../models/Product");
var {ObjectId} = require('mongodb');
const mongoose = require('mongoose');

module.exports.delItem = async (req, res) => {
    let del = (req.body.del).trim();

    const result = await Product.deleteOne({"_id" : ObjectId(del) })
    Product.remove({"_id" : del }).setOptions({ single : true})

    res.redirect("/");
}