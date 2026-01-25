import express from "express";
import { AuthenticateToken } from "../tokenAuth/generateToken.js";
import {
  AddNewCourse,
  EnrollToCourse,
  GetAllCoursesForStudents,
  GetAllCoursesForTeachers,
  GetCourseDetails,
  GetStudentsEnrolledCourses,
  SaveStudiedHours,
} from "../controllers/courseController.js";

const courseRouter = express.Router();

//routes can be reached only if the token exists
courseRouter.get("/", AuthenticateToken, GetAllCoursesForStudents);
courseRouter.get(
  "/teachers-courses",
  AuthenticateToken,
  GetAllCoursesForTeachers,
);
courseRouter.get("/course-details/:id", AuthenticateToken, GetCourseDetails);
courseRouter.post("/new-course", AuthenticateToken, AddNewCourse);
courseRouter.post("/enroll", AuthenticateToken, EnrollToCourse);
courseRouter.get(
  "/courses-enrolled",
  AuthenticateToken,
  GetStudentsEnrolledCourses,
);
courseRouter.post("/save-attendance", AuthenticateToken, SaveStudiedHours);

export default courseRouter;
