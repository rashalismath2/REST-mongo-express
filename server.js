const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan");



//Route Files
const productsRoutes=require("./Routes/Products");
const ordersRoutes=require("./Routes/Orders");

var app=express();
app.set('view engine','ejs');

//Midlewares
app.use(morgan('dev'));

//Routes
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);

//Source files
app.use('/dist',express.static("dist"));
// app.use('/bootstrap/js',express.static("./node_modules/bootstrap/dist/js/bootstrap.min.js"));
// app.use('/bootstrap/css',express.static("./node_modules/bootstrap/dist/css/bootstrap.min.css"));

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

dotenv.config();
app.listen(process.env.PORT,()=>{
    console.log("Server has been started on port "+process.env.PORT);
});