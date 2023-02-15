const mongoose = require("mongoose");
const { Schema } = mongoose;

var wishSchema = new mongoose.Schema({
    
    products:[
        {type: Schema.Types.ObjectId, ref: 'product'}
    ]
});
module.exports = mongoose.model("Wishlists",wishSchema)