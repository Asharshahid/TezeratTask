const mongoose =require("mongoose");

mongoose.connect('mongodb://localhost:27017/RegistrationDetail', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify:fasle
}).then(()=>{console.log("Connection succesful")})
.catch( (error)=>{console.log(`Connection failed ${error}`)})

// mongodb+srv://username:<password>@cluster0.jxe1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
