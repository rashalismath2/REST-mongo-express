const mongoose=require("mongoose");
const schema=mongoose.Schema;

const ProductChema=new schema({
    name:String,
    price:Number
})

const ProductModel=mongoose.model("Product",ProductChema);

module.exports=ProductModel;