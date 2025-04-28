import orderModel from "../models/orderModel";
import userModel from "../models/userModels";
import Stripe from "stripe";


// global variables
const currency = "inr";
const deliveryCharge = 10;

//getway initialization
const stripe = new Stripe(process.env.STRIPE_SECRIT_KEY);

//placing order using cod Method
const placeOrder = async (req, res) => {
  try {
    const { userId, address, amount } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

//placing order using Stripe Method

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, address, amount } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    })
    res.json({ success: true, session_url:session.url });

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Something went wrong in Stripe" });
  }
};
//verify stripe
const verifyStripe = async (req, res) => {
  const {userId, success, orderId} = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order Placed Successfully" });
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order Failed" });
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Something went wrong in Stripe" });
  }
}

//placing order using RezarPay Method

const placeOrderRazerpay = async (req, res) => {};

// All Data for admin pannel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong in AllOrders Backend",
    });
  }
};

//user order data  for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong in UserOrders" });
  }
};

//update order status

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong in UpdateStatus",
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazerpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
