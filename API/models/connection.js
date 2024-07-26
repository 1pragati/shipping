import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const Mongo_url = "mongodb+srv://pragatipatidarsrj:3iLgC7iG3B3hk7Gx@shipping.uhxglyk.mongodb.net/?retryWrites=true&w=majority&appName=shipping";

const DB = mongoose.connect(Mongo_url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    //console.log(DB);
    console.log("Database Connected");
}).catch((err)=>{
     console.log(err);
    console.log("Database Connection Error");
});