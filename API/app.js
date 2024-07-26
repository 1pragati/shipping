import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
const app=express();


//to link router
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ShipmentRouter from './routes/shipment.router.js';
import BidRouter from './routes/bid.router.js';
//import aRouter from './routes/admin.router.js';
dotenv.config();
//to overcome cross origin problem
app.use(cors());

//to extract file data from request
app.use(fileUpload());

//to extract body data from request
//(Post,Put,Delete,Patch)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//route level middleware for url routing
app.use("/user",UserRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/shipment",ShipmentRouter); 
app.use("/bid",BidRouter);
//app.use("/admin",aRouter);

app.listen(3001);
console.log("server invoked at link http://localhost:3001");