const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const db=require("./DB/database.js");



dotenv.config();

//Route Files
const productsRoutes=require("./Routes/Products");
const ordersRoutes=require("./Routes/Orders");
const userRoutes=require("./Routes/Users");

var app=express();
app.set('view engine','ejs');

//Midlewares
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Corse error handlings
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");

    if(req.method=="OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH");
        return res.status(200).json({});
    }
    next();
})

//Routes
app.use('/api/products',productsRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/users',userRoutes);

//Source files
app.use('/dist',express.static("dist"));

//Error Handling. If no route found
app.use((req,res,next)=>{
    const error=new Error("Route Not Found!");
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.render('error',{error_code:error.status,error_message:error.message});
});


//mongodb
db.connection.once("open",()=>{
    console.log("Connection to the mongo db has been initiated");  
    app.listen(process.env.PORT,()=>{
        console.log("Server has been started on port "+process.env.PORT);
    });
  
}).on("error",(error)=>{
    console.log("Connecting to the database error ",error);
});
