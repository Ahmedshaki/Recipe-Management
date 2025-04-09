const User = require("../model/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is Invalid");
    }

    const decodeMessage = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeMessage;
    const validUserFromDB = await User.findById(_id);

    if (!validUserFromDB) {
      throw new Error("User is not Present");
    }

    req.user = validUserFromDB;
    next();
  } catch (err) {
    res.status(400).json({
      message: `Error : ${err.message}`,
    });
  }
};

module.exports = {
    userAuth
}