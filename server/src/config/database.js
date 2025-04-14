const mongoose = require("mongoose");


const connectDB = async() =>{
    mongoose.connect(
        "mongodb+srv://shakirahmed:S11HcRtDdr8wTkcs@namastenode.fzfb5.mongodb.net/recipeManagement"
    )
}

module.exports = connectDB;