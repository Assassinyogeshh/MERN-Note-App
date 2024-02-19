import userAuth from "../Model/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userAuth.findOne({ email });
    if (!userData) {
      console.log(userData);
      return res.status(404).send('Invalid Credentials');
    }

    const checkPassword = await bcrypt.compare(password, userData.password);

    if (!checkPassword) {
      return res.status(404).send('Invalid Credentials');
    }

    const token = jwt.sign({ email: userData.email, id: userData._id }, process.env.SECRET_KEY, { expiresIn: "1h" });


    return res.status(200).json({ message: 'user successfully login', token, userData })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to logged In' })
  }
}


export const register = async (req, res) => {

  try {

    const { userName, email, password, C_password } = req.body;

    if (!userName || !email || !password || !C_password) {
      return res.status(404).json("Fill the appropriate field")
    }

    const userData = await userAuth.findOne({ email });

    if (userData) {
      return res.status(409).send('User Already Exist');
    }

    if (password !== C_password) {
      return res.status(400).json("Password should match with confirm password")
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUserData = await userAuth.create({ userName, email, password: hashPassword, C_password: hashPassword });

    const token = jwt.sign({ email: newUserData.email, id: newUserData._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

    return res.status(200).json({ message: "User successfully registered", token, newUserData });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed To register user")
  }
}