// add product to user cart

import userModel from "../models/userModel.js"

const  addToCart=async (req,res)=>{
  try{
    const {userId,itemId,size}=req.body

    const userData=await userModel.findById(userId)
    let cartData= await userData.cartData;

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size]+=1;
      }
      else{
        cartData[itemId][size]=1;
      }
    }
    else{
      cartData[itemId]={}
      cartData[itemId][size]=1;
      
    }
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Item added to cart"});
  }
  catch(error){
    res.json({success:false,message:error.message})
    console.log(error)

  }
  
}

const  updateCart=async (req,res)=>{
  try{
    const {userId,itemId,size,quantity}=req.body

    const userData=await userModel.findById(userId)
    let cartData= await userData.cartData;
    cartData[itemId][size]=quantity;
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Cart updated"})
  }

  catch(error){
    res.json({success:false,message:error.message})
    console.log(error)
  }

}


const  getUserCart=async (req,res)=>{
  try{
    const {userId}=req.body
    const userData=await userModel.findById(userId)
    let cartData= await userData.cartData;
    res.json({success:true,cartData})
  }
  catch(error){
    res.json({success:false,message:error.message})
    console.log(error)
  }
  
}


export {addToCart,updateCart,getUserCart}








// // controllers/cartController.js
// import userModel from "../models/userModel.js";
// import client from "../config/client.js";

// const CART_PREFIX = "cart:"; // Redis me key prefix

// //  Add to Cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;
//     const redisKey = `${CART_PREFIX}${userId}`;

//     // 1. Redis se cart fetch karo
//     let cartData = await client.get(redisKey);
//     cartData = cartData ? JSON.parse(cartData) : {};

//     // 2. Update cart data
//     if (!cartData[itemId]) cartData[itemId] = {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     // 3. Redis me update karo (fast response ke liye)
//     await client.set(redisKey, JSON.stringify(cartData), { EX: 60 * 30 }); // 30 mins cache

//     // 4. DB update karo (consistency ke liye)
//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Item added to cart", cartData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//     console.error(error);
//   }
// };

// //  Update Cart
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;
//     const redisKey = `${CART_PREFIX}${userId}`;

//     let cartData = await client.get(redisKey);
//     cartData = cartData ? JSON.parse(cartData) : {};

//     if (!cartData[itemId]) cartData[itemId] = {};
//     cartData[itemId][size] = quantity;

//     await client.set(redisKey, JSON.stringify(cartData), { EX: 60 * 30 });
//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Cart updated", cartData });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//     console.error(error);
//   }
// };

// //  Get User Cart
// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const redisKey = `${CART_PREFIX}${userId}`;

//     // 1. Redis se try karo (fast read)
//     let cartData = await client.get(redisKey);

//     if (cartData) {
//       return res.json({ success: true, cartData: JSON.parse(cartData), from: "redis" });
//     }

//     // 2. Agar Redis me nahi hai → MongoDB se lao
//     const userData = await userModel.findById(userId);
//     cartData = userData.cartData || {};

//     // 3. Redis me dubara set karo (cache warm)
//     await client.set(redisKey, JSON.stringify(cartData), { EX: 60 * 30 });

//     res.json({ success: true, cartData, from: "db" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//     console.error(error);
//   }
// };

// export { addToCart, updateCart, getUserCart };
