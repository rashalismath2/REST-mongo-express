const express=require("express");
const router=express.Router();
const Order=require("../Model/Order.js");


router.get('/',(req,res,next)=>{
    Order.find()
        .then((data)=>{        
            res.status(200).json({
                message:"Order Lists",
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
    
    var order=new Order({
        name:req.body.name,
        price:req.body.price
    });
    order.save()
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

router.get('/:orderId',(req,res,next)=>{

    Order.findById(req.params.orderId)
        .then((data)=>{        
            if (data) {
                res.status(200).json({
                    message:"Requested order",
                    product:data
                })
            } else {
                res.status(404).json({
                    message:"Couldnt find the item"
           
                })
            }
        })
        .catch(()=>{
            res.status(500).json({
                message:"Could not fetch the data"
            })
        })

});

router.put('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling PUT Request to /products/productId "+req.params.orderId
    })
});
router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Handling DELETE Request to /products/productId "+req.params.orderId
    })
});

module.exports=router;