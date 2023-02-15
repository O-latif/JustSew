const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    content:{
        type : String
    },
    prodCover1 : {
        type : Buffer,
    },
    prodCover2 : {
        type : Buffer,
    },
    prodCover3 : {
        type : Buffer,
    },
    prodCover4 : {
        type : Buffer,
    },
    prodCover5 : {
        type : Buffer,
    },
    prodCover6 : {
        type : Buffer,
    },
    prodCover7 : {
        type : Buffer,
    },
    prodCover8 : {
        type : Buffer,
    },
    date: { type : String},
    liked: [{type: ObjectId, ref:"User"}]
    
},{timestamps: true});

postSchema.virtual("path1").get(function() {
    if(this.prodCover1 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover1.toString('base64')}`
    }
})
postSchema.virtual("path2").get(function() {
    if(this.prodCover2 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover2.toString('base64')}`
    }
})
postSchema.virtual("path3").get(function() {
    if(this.prodCover3 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover3.toString('base64')}`
    }
})
postSchema.virtual("path4").get(function() {
    if(this.prodCover4 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover4.toString('base64')}`
    }
})
postSchema.virtual("path5").get(function() {
    if(this.prodCover5 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover5.toString('base64')}`
    }
})
postSchema.virtual("path6").get(function() {
    if(this.prodCover6 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover6.toString('base64')}`
    }
})
postSchema.virtual("path7").get(function() {
    if(this.prodCover7 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover7.toString('base64')}`
    }
})
postSchema.virtual("path8").get(function() {
    if(this.prodCover8 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover8.toString('base64')}`
    }
})

module.exports = mongoose.model("Post",postSchema)
