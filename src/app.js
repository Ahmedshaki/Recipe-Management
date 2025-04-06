const express = require("express");
const connectDB = require('./config/database');
const User = require('./model/user');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/hello",(req,res)=>{
    res.json({
        message : "Hello Shakir"
    })
})


app.post('/signup',async(req,res)=>{
    try{
        const {name, email, phone, gender, country, state, password} = req.body;

        const user = new User({
            name,
            email,
            phone,
            gender,
            country,
            state,
            password
        })

        await user.save();
        res.json({
            message : "User added Successfully"
        })
    }
    catch(err){
        res.status(404).send("Error saving the user:" + err.message);
    }
    
})

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
