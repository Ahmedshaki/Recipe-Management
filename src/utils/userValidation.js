const validator = require("validator");

const userDetailsValidation = (req) =>{
    const {name, email, phone, gender, country, state, password} = req.body;

    if(!name){
        throw new Error("Enter valid name");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter a valid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
    }
    else if(!validator.isMobilePhone(phone)){
        throw new Error("Enter a valid phone number");
    }
    else if(!["male","female","others"].includes(gender?.toLowerCase())){
        throw new Error("Enter a valid gender");
    }
}

module.exports = {
    userDetailsValidation
}