import express from "express";
import {
  GetAllUsers,
  LoginUser,
  RegisterUser,
} from "../controllers/usersController.js";
import { AuthenticateToken } from "../tokenAuth/generateToken.js";

const userRouter = express.Router();

userRouter.get("/", AuthenticateToken, GetAllUsers);
userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter;
