import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import mongoose from "mongoose";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongodb = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ChatApp';


mongoose.connect(mongodb).then(()=> {
    console.log('Connected to mongo DB');
    app.listen(PORT)
}).catch(err => {
    console.log(err);
})

app.use(express.json()); 

// app.use((req,res, next) => {
//     console.log(req.url)
//     next()
// })

app.use("/api/auth" , authRoutes)
