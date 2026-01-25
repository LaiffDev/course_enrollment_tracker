import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Course from "../models/courses.js";

dotenv.config();

/*helper function to sanitize the data being sent to the browser
 *password and email are being "removed" from response for security purpose
 */
const sanitize = (user) => {
  const { email, password, ...securedUser } = user.dataValues;
  return securedUser;
};

//API's
//get all users
export const GetAllUsers = async (req, res) => {
  try {
    const loggedUser = req.user;
    const user = await User.findOne({ where: { email: loggedUser.email } });

    /**
     * the visualization of every user is accessible only for instructors
     */
    if (user.dataValues.role !== "Docente") {
      return res.status(401).json({ message: "Unauthorized user!" });
    }

    const allUsers = await User.findAll({ raw: true });
    res.status(200).json(sanitize(allUsers));
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json(`Internal server error : ${error}`);
  }
};
//register a new user
export const RegisterUser = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  try {
    if (!fullname || !username || !email || !password || !role) {
      return res.status(400).json("All fields are required!");
    }

    //check if a user with that email or username already exists
    const existingUser = await User.findOne({ where: { email, username } });
    if (existingUser) {
      return res.status(409).json("User already exists!");

      /**
       * in frontend remember to alert the user when one of the two
       * matches with data stored in db
       */
    }

    //salting and hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //payload
    const payload = {
      fullname,
      username,
      email,
      password: hashedPassword,
      role,
    };

    const newUser = await User.create(payload);

    res.status(201).json({
      message: "User registered succesfully!",
      user: sanitize(newUser),
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

//login for users
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET;

  try {
    //search for user with the same email from input
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json("User not found");
    }

    //compare for password checks
    const passwordCheck = await bcrypt.compare(
      password,
      user.dataValues.password,
    );

    if (!passwordCheck) {
      return res.status(400).json("Invalid user credentials");
    }

    //to be sent for token purpose when signing in
    const payload = {
      email,
      password,
    };

    //generate token for signed user
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: `Login succesful`,
      logged: sanitize(user),
      token,
    });
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};
