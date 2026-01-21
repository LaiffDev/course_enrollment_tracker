import express from "express";
import {
  GetAllUsers,
  LoginUser,
  RegisterUser,
} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/", GetAllUsers);
userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter;
