const mongoose = require("mongoose");


var repSchema = new mongoose.Schema({
    
    userId: { type : String},
    userFName: { type : String},
    userLName: { type : String},
    comId: { type : String},
    content: { type : String},
    date: { type : String}
});
module.exports = mongoose.model("BlogRep",repSchema)