import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findById(decoded.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    userData.address.push(address);
    await userData.save();
    res.json({ success: true, message: "Address Added successfully" });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message })
    console.log(error);
  }
}
const removeAddress = async (req, res) => {
  try{
    const {address}=req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findById(decoded.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    userData.address.pull(address);
    await userData.save();
    res.json({ success: true, message: "Address removed successfully" });
  }
  catch(error){
    res.status(500).json({ success: false, message: error.message })
    console.log(error);
  }

}
const getAddress = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findById(decoded.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, address: userData.address });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message })
    console.log(error);
  }
}


export  {addAddress,removeAddress,getAddress};

