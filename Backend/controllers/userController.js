
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}
//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    else {
      const token = createToken(user._id);
      res.json({ success: true, token });
    }


  }
  catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message })

  }
}

//Route for user signup

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" })
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      })
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword
    })

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });


  }
  catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message })



  }


}
//Route fo admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(err);
    res.json({ success: false, message: err.message })

  }



}


export { loginUser, registerUser, adminLogin };