const mongoose =require("mongoose");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        // unique:[true, "This email is already used"],
        // validate(value){
        //     if(!validator ===value){
        //         throw new Error("Invalide Email");
        //     }
        // }
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

// GENERATE TOKEN $$$$$$$$$$$$$$$$$$$$$$$$$$
userschema.methods.generateAuthToken = async function(){
  try{
        console.log(this._id)      
        const token = jwt.sign({_id:this._id.toString()},"qwertyuiopasdfghjklzxcvbnmqwertyuiop");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log("token from register "+token)
        return token;
    }catch(err){
        console.log(err)
    }
}


// HASHING PASSWORD $$$$$$$$$$$$$$$$$$$$$$$$$$

// userschema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 10)
//         this.confirmpassword=await bcrypt.hash(this.confirmpassword, 10);
//     }
//     next();
// })

const register = new mongoose.model("register", userschema);
module.exports= register;