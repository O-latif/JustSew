const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    
    name:{
        type : String,
    },
    size: {
        type : String
    },
    forms : {
        type : String,
    },
    price : {
        type : Number,
    },
    note : {
        type : Number,
        default : 0
    },
    reviews : {
        type : Number,
        default : 0
    },
    moyen : {
        type : Number,
        default : 0
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
    gender : {
        type : String
    }
},{timestamps: true})


productSchema.virtual("path1").get(function() {
    if(this.prodCover1 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover1.toString('base64')}`
    }
})
productSchema.virtual("path2").get(function() {
    if(this.prodCover2 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover2.toString('base64')}`
    }
})
productSchema.virtual("path3").get(function() {
    if(this.prodCover3 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover3.toString('base64')}`
    }
})
productSchema.virtual("path4").get(function() {
    if(this.prodCover4 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover4.toString('base64')}`
    }
})
productSchema.virtual("path5").get(function() {
    if(this.prodCover5 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover5.toString('base64')}`
    }
})
productSchema.virtual("path6").get(function() {
    if(this.prodCover6 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover6.toString('base64')}`
    }
})
productSchema.virtual("path7").get(function() {
    if(this.prodCover7 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover7.toString('base64')}`
    }
})
productSchema.virtual("path8").get(function() {
    if(this.prodCover8 != null) {
        return `data:JPG;charset=utf-8;base64,${this.prodCover8.toString('base64')}`
    }
})
module.exports = mongoose.model("product",productSchema)