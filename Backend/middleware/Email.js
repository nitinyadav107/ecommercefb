
import { transporter } from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template ,Order_Placed_Email_Template} from "./EmailTemplate.js";


export const sendVerificationEamil=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"Nitin" <nitinyadav4800@gmail.com>',

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
export const senWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"Nitin" <nitinyadav4800@gmail.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
export const sendOrderPlacedEmail = async (email, orderDetails) => {
    try {
      const response = await transporter.sendMail({
        from: '"Nitin" <nitinyadav4800@gmail.com>',
        to: email, // list of receivers
        subject: "Order Confirmation", // Subject line
        text: "Your order has been placed successfully.", // plain text body
        html: Order_Placed_Email_Template
          .replace("{orderId}", orderDetails.orderId)
          .replace("{customerName}", orderDetails.customerName)
          .replace("{orderDate}", new Date(orderDetails.date).toLocaleDateString()) // Format date for better readability
          .replace("{orderTotal}", orderDetails.amount.toFixed(2)) // Format amount for better readability
      });
      console.log('Order Placed Email sent successfully', response);
    } catch (error) {
      console.log('Email error', error);
    }
  };