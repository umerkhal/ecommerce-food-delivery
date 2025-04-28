import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazerpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from './../middleware/adminAuth';
import authUser from './../middleware/auth';
import authUser from './../middleware/auth';

const orderRouter = express.Router()


// Admin Features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,userOrders);

//Payment Method
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazerpay);

//User Feature 
orderRouter.post('/userorders',authUser,userOrders);

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter