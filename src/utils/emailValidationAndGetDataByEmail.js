const validator = require("validator");
const User = require("../model/user");
const validateEmail = (email) =>{
    if (!email) {
      return res.status(404).send(`Enter an email`);
    }

    if (!validator.isEmail(email)) {
      return res.status(404).send(`Enter a valid email`);
    }
}

const getDataByEmail = async(email) =>{
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return res.status(404).send(`User not found Please SignUp`);
  }
  return validUser;
}



module.exports = {
    validateEmail,
    getDataByEmail
}