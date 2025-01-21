import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import { sendOrderPlacedEmail } from "../middleware/Email.js";

//global variables
const currency = "INR"
const deliveryCharge = 0

// gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret: process.
    env.RAZORPAY_KEY_SECRET,
})
//placing order using cod  method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Fetch the user to get the customer name
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

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

    // Send email with correct data
    await sendOrderPlacedEmail(user.email, {
      orderId: newOrder._id,
      customerName: user.name, // assuming user has a name field
      date: newOrder.date,
      amount: newOrder.amount
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
}




//placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;


    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // Save new order to database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error)
        return res.json({ success: false, message: error })
      }
      res.json({ success: true, order })
    })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }


}
const verifyRazorpay = async (req, res) => {

  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);

    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({
        success: true, message:
          "Payment Successful"
      })
    } else {
      res.json({
        success: false, message:
          'Payment Failed'
      })
    }

  }

  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }

}
//All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }


}
// all orders data for user panel
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders })

  }
  catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }


}
//update order status from admin pannel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Order Status Updated Successfully" })
  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

export { placeOrder, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus  }