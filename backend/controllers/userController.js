import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModels.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //chicking user already exist or not

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "User login successfully", token });
    } else {
      res.json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
//route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //chicking user already exist or not

    const axist = await userModel.findOne({ email });
    if (axist) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validating email format & strong password

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Place Enter a strong passsword",
      });
    }
    //hassing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

//route for admin login
const adminLogin = async (req, res) => {;

try {
  const { email,password} = req.body;
  //chicking user already exist or not
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(email+password, process.env.JWT_SECRET);
    res.json({ success: true,token});
  } else {
    res.json({ success: false, message: "Invalid password" });
  }
} catch (error) {
  console.log(error);
  res.json({ success: false, message: "Something went wrong in Login" });
}
};
export { loginUser, registerUser, adminLogin };
