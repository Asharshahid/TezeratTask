const express = require("express");
require("./db/connection");
const register = require("./registration/register");
const auth =require("./middlewire/auth");
const auths =require("./middlewire/auths");
const app = express();
const hbs =require("hbs");
const path =require("path");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const cookieParser =require("cookie-parser");
const async = require("hbs/lib/async");

const port = process.env.PORT ||9000;



const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(cookieParser());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// SERVER AREA $$$$$$$$$$$$ REQ RES

app.get("/", (req,res)=>{
    res.render("index");
})
app.get("/secret",auth ,(req,res)=>{
    res.render("secret");
})

app.get("/logout",auths, async(req,res)=>{
    try{
        console.log(req.user);
        req.user.tokens=[];
        res.clearCookie("jwt");
        await req.user.save();
        res.render("signin");

    }catch(error){
        console.log(`logout error is ${error}`);
    }
})


app.get("/login", (req,res)=>{
    res.render("signin");
})

app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await register.findOne({email:email})
        console.log(useremail);
        console.log(useremail.password);
        

        if(password==useremail.password){
            const token = await useremail.generateAuthToken();

            res.cookie("jwt", token, {
            // expires:new Date(Date.now()+50000),
            httpOnly:true
          })

            res.status(200).render("secret");
        }
        else{
            res.send("invalid details")
        }
    }
    catch(err){
        res.send("invalid detail email not found")
    }
})

app.get("/signup", (req,res)=>{
    res.render("signup");
})
app.post("/register", async (req,res)=>{
    try{
        
        const registerEmployee = new register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

            console.log(registerEmployee);
            const registered = await registerEmployee.save();
            res.status(200).render("signin");

    }
    catch(err){
        res.send(err);
    }
})




app.listen(port, ()=>{
    console.log(`Run at port number ${port}`);
})