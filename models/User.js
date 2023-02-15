const mongoose = require("mongoose");
const {isEmail} = require("validator")
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    fname:{
        type : String,
        required : [true , "Please enter a First name "]
    },
    lname:{
        type : String,
        required :[true , "Please enter a Last name "]
    },
    email:{
        type : String,
        required : [true , "Please enter an Email "],
        unique : [true , "Email déja existe !"],
        lowercase : true,
        validate : [isEmail , "Please enter a valid Email"]
    },
    mdp:{
        type : String,
        required : [true , "Please enter a Passsword "],
        minlength : [6 , "Minimum Password length is 6 characters "]
    },
    owner:{
        type:Boolean,
        default : false
    },
    wishlist:{
        type : String,
        default : ""
    }
    
    
},{timestamps: true});

userSchema.pre("save",async function(next) {
    const salt = await bcrypt.genSalt();
    this.mdp = await bcrypt.hash(this.mdp, salt);
    next();
});

userSchema.statics.login = async function(email , mdp) {
    const user = await this.findOne({ email });
    
    if (user) {
        const auth = await bcrypt.compare(mdp , user.mdp);
        if(auth) {
            return user;
        }
        throw Error("incorrect password !");
    } 
    throw Error("incorrect email !");
}


module.exports = mongoose.model("User",userSchema)