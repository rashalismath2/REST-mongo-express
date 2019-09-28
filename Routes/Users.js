const express=require("express");
const router=express.Router();
const User=require("../Model/User.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


router.post('/signup',(req,res,next)=>{
    User
    .findOne({email:req.body.email})
    .then((data)=>{
        if(data){
            return res.status(409).json({
                message:"Please make user your email address doesnt exists already"
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(error,hash)=>{
                if(error){
                    console.log("Hashing Error "+error);
                    res.status(500).json({
                        message:error
                    });
                }else{
                    console.log("Created password "+hash);
                    const user=new User({
                        email:req.body.email,
                        password:hash
                    });
                    //save to the database
                    user
                    .save()
                    .then((data)=>{
                        res.status(200).json({
                            message:"User has been saved in to the db",
                            user:{
                                id:user.id,
                                email:data.email
                            }
                        });
                    })
                    .catch((e)=>{
                        console.log("Saving user to the db error "+e);
                        res.status(500).json({
                            message:e
                        });
                    })
                }
            })
        }
    })
    
});


router.post("/login",(req,res,next)=>{
    User
    .findOne({email:req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed" 
                })
            }
            if(result){

                const token=jwt.sign(
                    {
                        id:req.body.id,
                        email:req.body.email
                    },
                    process.env.JWT_PASSWORD,
                    {
                        expiresIn:60*60
                    }
                )

                return res.status(200).json({
                    message:"Auth succeeded",
                    token:token
                })
            }

            return res.status(401).json({
                message:"Auth failed"
            })

        })
    })
    .catch(e=>{
        req.status(401).json({
            message:"Auth failed"
        })
    })

})





module.exports=router;