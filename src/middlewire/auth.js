const jwt =require("jsonwebtoken");
const register = require("../registration/register");

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser =jwt.verify(token,"qwertyuiopasdfghjklzxcvbnmqwertyuiop");
        console.log(verifyUser);
        const user = await register.findOne({_id:verifyUser._id})

        req.token=token;
        req.user=user;

        next();

    }catch(error){
        res.render("error");
    }
}

module.exports= auth;