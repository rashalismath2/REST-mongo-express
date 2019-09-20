const mongoose=require("mongoose");
const schema=mongoose.Schema;

const OrderSchema=new schema({
    name:String
})

const OrderModel=mongoose.model("Order",OrderSchema);

module.exports=OrderModel;