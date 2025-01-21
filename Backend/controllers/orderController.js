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


// place order using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Prepare order data
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    // Save new order to database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as a line item
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    // Respond with session URL
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    // Validate that orderId and userId exist and are not empty
    if (!orderId || !userId) {
      return res.status(400).json({ success: false, message: "Order ID or User ID is missing." });
    }

    // Handle the success case
    if (success === "true" || success === true) { // This allows both "true" string or boolean true
      // Update the order to mark payment as successful
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.status(200).json({ success: true, message: "Payment verified and order updated." });
    } else {
      // In case payment failed, delete the order
      await orderModel.findByIdAndDelete(orderId);

      return res.status(400).json({ success: false, message: "Payment failed; order has been deleted." });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in verifyStripe:", error);

    // Return an error response with proper status code
    return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
  }
};

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
      await orderModel.deleteOne({ _id: orderInfo.receipt });
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

export { placeOrder, placeOrderStripe, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus, verifyStripe }