const express=require("express");
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Request to /products"
    })
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling POST Request to /products"
    })
});

router.get('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Request to /products/productId "+req.params.productId
    })
});

router.put('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling PUT Request to /products/productId "+req.params.productId
    })
});
router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling DELETE Request to /products/productId "+req.params.productId
    })
});

module.exports=router;