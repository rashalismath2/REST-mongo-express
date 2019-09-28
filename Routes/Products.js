const express=require("express");
const router=express.Router();
const Product=require("../Model/Product.js");
const multer=require("multer");
const JWTAuth=require("../middlewares/JWTAth");

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads/");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
});

const fileFilter=(req,file,callback)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        callback(null,true);
    }else{
        callback(new Error("MimeTypes was not acceptable"),false);
    }
}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});


router.get('/',JWTAuth,(req,res,next)=>{
    Product.find().select("id name price prodctImage")
        .then((data)=>{ 
            var response={
                Message:"Products data list",
                Count:data.length,
                Products:data.map(result=>{
                    return {
                        id:result.id,
                        name:result.name,
                        price:result.price,
                        prodctImage:result.prodctImage,
                        request:{
                            method:"GET",
                            url:`127.0.0.1/api/products/${result.id}`
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(()=>{
            res.status(500).json({
                message:"Could not fetch the data"
            })
        })
});

router.post('/',JWTAuth,upload.single("productImage"),(req,res,next)=>{
    console.log(req.file);
    var product=new Product({
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
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
                message:error+" Could not save in to the databse"
            })
        });

});

router.get('/:productId',JWTAuth,(req,res,next)=>{

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

router.put('/:productId',JWTAuth,(req,res,next)=>{
    res.status(200).json({
        message:"Handling PUT Request to /products/productId "+req.params.productId
    })
});
router.delete('/:productId',JWTAuth,(req,res,next)=>{
    res.status(200).json({
        message:"Handling DELETE Request to /products/productId "+req.params.productId
    })
});

module.exports=router;