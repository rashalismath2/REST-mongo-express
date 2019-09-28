const mongoose=require("mongoose");
const schema=mongoose.Schema;


const OrderSchema=new schema({
    name:String,
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"}
})

const OrderModel=mongoose.model("Order",OrderSchema);

module.exports=OrderModel;