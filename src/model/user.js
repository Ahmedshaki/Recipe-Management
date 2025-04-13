const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    phone : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        enum : ["Male","Female","Others"],
        required : true
    },
    country : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    
    resetOTP: {
        type: String,
        default: null
    },
    resetOTPExpires: {
        type: Date,
        default: null
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("User",userSchema);