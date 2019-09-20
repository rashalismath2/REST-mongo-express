const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

mongoose.connect("mongodb+srv://ismath:"+process.env.MONGODB_PW+"@cluster0-vwh2t.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });

module.exports=mongoose;