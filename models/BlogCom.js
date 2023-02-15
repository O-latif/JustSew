const mongoose = require("mongoose");


var comSchema = new mongoose.Schema({
    
    userId: { type : String},
    userFName: { type : String},
    userLName: { type : String},
    postId: { type : String},
    content: { type : String},
    date: { type : String}
});
module.exports = mongoose.model("BlogCom",comSchema)