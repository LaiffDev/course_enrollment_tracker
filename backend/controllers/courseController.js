import Course from "../models/courses.js";
import User from "../models/users.js";

export const GetAllCoursesForStudentOrTeacher = async (req, res) => {
  try {
    const userLogged = req.user;
    const user = await User.findOne({ where: { email: userLogged.email } });

    if (user.dataValues.role === "Studente") {
      const courses = await Course.findAll({
        where: { status: "Disponibile" },
      });
      res.status(200).json(courses);
    } else {
      const courses = await Course.findAll({
        where: { instructor_id: user.dataValues.id },
      });
      res.status(200).json(courses);
    }
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

export const AddNewCourse = async (req, res) => {
  const { title, description, status, establishedTime, published } = req.body;

  try {
    //find the user logged in
    const userLogged = req.user;
    const user = await User.findOne({ where: { email: userLogged.email } });

    //if the user does not have role == "Docente"
    if (user.dataValues.role !== "Docente") {
      return res.status(401).json(`Unauthorized user.`);
    }

    const payload = {
      title,
      description,
      instructor_id: user.dataValues.id,
      status,
      establishedTime,
      published,
    };

    const savedCourse = await Course.create(payload);
    res.status(201).json({
      message: "Course created successfully.",
      course: savedCourse,
    });
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};
