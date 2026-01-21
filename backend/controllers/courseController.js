import Course from "../models/courses.js";

export const GetAllCourses = async (req, res) => {
  const allCourses = await Course.findAll({ raw: true });
  res.status(200).json(allCourses);
};
