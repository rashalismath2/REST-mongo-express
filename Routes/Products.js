const express=require("express");
const router=express.Router();
const Product=require("../Model/Product.js");


router.get('/',(req,res,next)=>{
    Product.find()
        .then((data)=>{        
            res.status(200).json({
                message:"Product Lists",
                product:data
            })
        })
        .catch(()=>{
            res.status(500).json({
                message:"Could not fetch the data"
            })
        })
});

router.post('/',(req,res,next)=>{
    
    var product=new Product({
        name:req.body.name,
        price:req.body.price
    });
    product.save()
        .then((model)=>{
            res.status(200).json({
                message:"Product Has Been Saved",
                product:model
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message:"Could not save in to the databse"
            })
        });

});

router.get('/:productId',(req,res,next)=>{

    Product.findById(req.params.productId)
        .then((data)=>{        
            res.status(200).json({
                message:"Requested Product",
                product:data
            })
        })
        .catch(()=>{
            res.status(500).json({
                message:"Could not fetch the data"
            })
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