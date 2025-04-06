const express = require("express");
const connectDB = require('./config/database');
const app = express();
const port = 3000;

app.use(express.json());

const userAuth = require("./routes/user");

app.use("/",userAuth);

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
