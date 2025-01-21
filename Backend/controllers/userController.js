
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../models/userModel.js";
import { sendVerificationEamil, senWelcomeEmail } from "../middleware/Email.js"

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
      const v= user.isVerified;
      if(v===false){
        await sendVerificationEamil(user.email, user.verficationToken)
      }
      res.json({ success: true, token , v});
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
    const verficationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })

    const user = await newUser.save();

    const token = createToken(user._id);
    await sendVerificationEamil(user.email, verficationToken)
    res.json({ success: true, token, email });


  }
  catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message })



  }


}
const VerfiyEmail = async (req, res) => {
  try {
    const { code, email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }
    if (user.verficationToken !== code || user.verficationTokenExpiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Inavlid or Expired Code" })
    }

    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save()
    await senWelcomeEmail(user.email, user.name)
    const token = createToken(user._id);
    return res.status(200).json({ success: true, token, message: "Email Verifed Successfully" })


  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "internal server error" })
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


export { loginUser, registerUser, adminLogin, VerfiyEmail };