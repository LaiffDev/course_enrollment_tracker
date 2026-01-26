import User from "../models/users.js";
import CourseEnrollment from "../models/enrollment.js";
import CourseStudyLog from "../models/courseLogs.js";

export const SaveStudiedHours = async (req, res) => {
  const { studied_hours, course_id, studied_date } = req.body;
  const userLogged = req.user;

  try {
    if (!studied_hours || studied_hours <= 0) {
      return res.status(400).json({
        message: "studied_hours must be a positive number",
      });
    }

    if (!studied_date) {
      return res.status(400).json({
        message: "studied_date is required",
      });
    }

    const user = await User.findOne({ where: { email: userLogged.email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const enrollment = await CourseEnrollment.findOne({
      where: { course_id, user_id: user.id },
    });
    if (!enrollment) {
      return res.status(404).json({
        message: "Course enrollment not found",
      });
    }

    // Create a new log for every request, no duplicates check
    const log = await CourseStudyLog.create({
      user_id: user.id,
      course_id,
      studied_date,
      studied_hours,
    });

    return res.status(201).json({
      message: "Study log saved",
      log,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const GetStudyLogs = async (req, res) => {
  const { course_id } = req.params;
  const userLogged = req.user;

  const user = await User.findOne({
    where: { email: userLogged.email },
  });

  const logs = await CourseStudyLog.findAll({
    where: {
      course_id,
      user_id: user.id,
    },
    order: [["studied_date", "ASC"]],
  });

  return res.json(logs);
};
