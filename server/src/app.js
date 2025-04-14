require("dotenv").config();
const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 3000;
const cookieparser = require("cookie-parser");
const cors = require("cors");
const corsOption = require("./config/corsConfig");


app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOption));

const userAuth = require("./routes/user");
const recipeAuth = require("./routes/recipe");

app.use("/",userAuth);
app.use("/",recipeAuth);

connectDB().
    then(()=>{
        console.log("DB connected successfully");
        app.listen(port,()=>{
            console.log(`Server is listinig on PORT ${port}`);
            
        })
    }).
    catch((err)=>{
        console.log("Connection failed, Please try again");
    })
