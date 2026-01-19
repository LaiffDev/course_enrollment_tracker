import express from "express";
import { GetAllUsers, RegisterUser } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/", GetAllUsers);
userRouter.post("/register", RegisterUser);

export default userRouter;
