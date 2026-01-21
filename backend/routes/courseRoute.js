import express from "express";
import { AuthenticateToken } from "../tokenAuth/generateToken.js";
import { GetAllCourses } from "../controllers/courseController.js";

const courseRouter = express.Router();

//routes can be reached only if the token exists
courseRouter.get("/", AuthenticateToken, GetAllCourses);

export default courseRouter;
