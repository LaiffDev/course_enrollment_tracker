import express from "express";
import { AuthenticateToken } from "../tokenAuth/generateToken.js";
import {
  AddNewCourse,
  GetAllCoursesForStudentOrTeacher,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

//routes can be reached only if the token exists
courseRouter.get("/", AuthenticateToken, GetAllCoursesForStudentOrTeacher);
courseRouter.post("/add-course", AuthenticateToken, AddNewCourse);

export default courseRouter;
