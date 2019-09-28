const mongoose=require("mongoose");
const schema=mongoose.Schema;

const ProductChema=new schema({
    name:{type:String,required:true},
    price:{type:Number,required:true}
})

const ProductModel=mongoose.model("Product",ProductChema);

module.exports=ProductModel;