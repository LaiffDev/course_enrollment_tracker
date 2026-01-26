// models/CourseStudyLog.js
import { sequelize, DataTypes } from "../database/dbConnection.js";

const CourseStudyLog = sequelize.define(
  "CourseStudyLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studied_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studied_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);

export default CourseStudyLog;
