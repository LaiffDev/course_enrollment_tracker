import User from "../models/users.js";
import Course from "../models/courses.js";
import CourseEnrollment from "../models/enrollment.js";

//a teacher can have/create many courses
User.hasMany(Course, {
  foreignKey: "instructor_id",
});

//many courses can belong to a single teacher
Course.belongsTo(User, {
  foreignKey: "instructor_id",
  as: "Docente",
  onDelete: "CASCADE",
});

//a student can enroll to many courses
User.belongsToMany(Course, {
  through: CourseEnrollment,
  foreignKey: "user_id",
  as: "Enrolled",
  onDelete: "CASCADE",
});

//a course can have many students
Course.belongsToMany(User, {
  through: CourseEnrollment,
  foreignKey: "course_id",
  as: "Studente",
});

Course.hasOne(CourseEnrollment, {
  foreignKey: "course_id",
  as: "enrollment",
});

CourseEnrollment.belongsTo(Course, {
  foreignKey: "course_id",
});
