import express from 'express';
import cors from 'cors';
const cors = require("cors");
const express = require("express");
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



//App Configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()



//Middlewares
app.use(cors());
app.use(express.json());


//api end points
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/', (req, res) => {
    res.send('Api Working')
})


//Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
