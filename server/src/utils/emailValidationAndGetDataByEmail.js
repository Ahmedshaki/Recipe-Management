const validator = require("validator");
const User = require("../model/user");
const validateEmail = (email, res) =>{
    if (!email) {
      throw new Error("Enter an email");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Enter a valid email");
    }
}

const getDataByEmail = async(email, res) =>{
  const validUser = await User.findOne({ email });
  if (!validUser) {
    throw new Error("User not found Please SignUp");
  }
  return validUser;
}



module.exports = {
    validateEmail,
    getDataByEmail
}