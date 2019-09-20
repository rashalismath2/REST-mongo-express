const express=require("express");
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Request to /orders"
    })
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling POST Request to /orders"
    })
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Request to /orders/orderId"
    })
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling DELETE Request to /orders/orderId"
    })
});


module.exports=router;