const mongoose = require("mongoose");


var comSchema = new mongoose.Schema({
    
    userId: { type : String},
    userFName: { type : String},
    userLName: { type : String},
    prodId: { type : String},
    note: { type : Number },
    content: { type : String},
    date: { type : String}
});
module.exports = mongoose.model("Comments",comSchema)