import { where } from "sequelize";
import Course from "../models/courses.js";
import CourseEnrollment from "../models/enrollment.js";
import User from "../models/users.js";

export const GetAllCoursesForStudents = async (req, res) => {
  try {
    const instructors = await User.findAll({
      raw: true,
      where: { role: "Docente" },
    });

    const courses = await Course.findAll({
      raw: true,
      where: { status: "Disponibile" },
    });

    const instructorMap = instructors.reduce((acc, instructor) => {
      acc[instructor.id] = instructor.fullname;
      return acc;
    }, {});

    const newCourseDataSet = courses.map((course) => ({
      ...course,
      instructor_name: instructorMap[course.instructor_id] ?? null,
    }));

    res.status(200).json(newCourseDataSet);
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

export const GetAllCoursesForTeachers = async (req, res) => {
  const userLogged = req.user;

  try {
    const user = await User.findOne({ where: { email: userLogged.email } });

    console.log(user);

    if (user.dataValues.role === "Docente") {
      const teachersCourse = await Course.findAll({
        where: { instructor_id: user.dataValues.id },
        raw: true,
      });

      teachersCourse
        .filter((courses) => courses.instructor_id === user.dataValues.id)
        .map((courses) => (courses.instructor_name = user.dataValues.fullname));

      res.status(200).json(teachersCourse);
    }
  } catch (error) {
    console.error("Error : ", error);
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
      return res
        .status(401)
        .json({ message: "Unauthorized user. Cannot create course!" });
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

export const GetCourseDetails = async (req, res) => {
  const { id } = req.params;

  let newCourseDataSet;

  try {
    const user = req.user;

    if (user) {
      const selectedCourse = await Course.findOne({ where: { id }, raw: true });
      if (!selectedCourse) return res.status(400).json("Course not available!");

      const instructors = await User.findAll({
        raw: true,
        where: { role: "Docente" },
      });

      const instructorMap = instructors.reduce((acc, instructor) => {
        acc[instructor.id] = instructor.fullname;
        return acc;
      }, {});

      newCourseDataSet = {
        ...selectedCourse,
        instructor_name: instructorMap[selectedCourse.instructor_id],
      };
    } else {
    }

    res.status(200).json(newCourseDataSet);
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

export const EnrollToCourse = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;
    const existingEnrolled = await CourseEnrollment.findOne({
      where: { user_id, course_id },
    });

    if (existingEnrolled) {
      return res.status(400).json("Already enrolled to the course");
    }

    const enrolledCourseToStudent = await Course.findAll({
      where: { id: course_id },
      raw: true,
    });

    enrolledCourseToStudent.map((course) => (course.student_id = user_id));

    console.log(enrolledCourseToStudent);

    const payload = {
      user_id,
      course_id,
      enrollmentStatus: true,
    };

    const newEnrollment = await CourseEnrollment.create(payload);
    res.status(200).json({
      message: "Enrolled successfully!",
      enrollment: newEnrollment,
    });
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

export const GetStudentsEnrolledCourses = async (req, res) => {
  const userLogged = req.user;

  try {
    const user = await User.findOne({
      where: { email: userLogged.email },
      raw: true,
    });
    const studentId = user.id;

    //enrolled course of a student
    const studentEnrolledCourses = await CourseEnrollment.findAll({
      where: { user_id: studentId },
      raw: true,
    });

    return res.status(200).json(studentEnrolledCourses);
  } catch (error) {
    return res.status(500).json(`Internal server error : ${error}`);
  }
};

export const SaveStudiedHours = async (req, res) => {
  const { studied_hours, course_id } = req.body;
  const userLogged = req.user;

  try {
    if (!studied_hours || studied_hours <= 0) {
      return res
        .status(400)
        .json({ message: "studied_hours must be a positive number" });
    }

    const user = await User.findOne({ where: { email: userLogged.email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const courseEnrollment = await CourseEnrollment.findOne({
      where: { course_id, user_id: user.id },
    });
    if (!courseEnrollment)
      return res.status(404).json({ message: "Course enrollment not found" });

    const course = await Course.findOne({ where: { id: course_id } });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const currentHours = courseEnrollment.studied_hours || 0;
    const maxHours = course.establishedTime;

    const hoursToAdd = Math.min(studied_hours, maxHours - currentHours);
    if (hoursToAdd <= 0) {
      return res
        .status(400)
        .json({
          message: "You have already completed the maximum course hours.",
        });
    }

    await CourseEnrollment.increment("studied_hours", {
      by: hoursToAdd,
      where: { course_id, user_id: user.id },
    });

    const updatedEnrollment = await CourseEnrollment.findOne({
      where: { course_id, user_id: user.id },
    });

    return res.status(200).json({
      message: "Studied hours updated successfully",
      studied_hours: updatedEnrollment.studied_hours,
      added_hours: hoursToAdd,
      max_hours: maxHours,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
