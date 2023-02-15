const mongoose = require("mongoose");
const { Schema } = mongoose;

var cartSchema = new mongoose.Schema({
    
    products:[
        {type: Schema.Types.ObjectId, ref: 'product'}
    ]
});
module.exports = mongoose.model("Cart",cartSchema)