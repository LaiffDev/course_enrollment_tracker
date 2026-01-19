import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbPath = process.env.DB_PATH;

//initializing connection using the sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
});

//establishing and authenticating connection to the database
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Authenticated to database");

    //synchronizing tables
    await sequelize
      .sync()
      .then(() => console.log("Tables synchronized"))
      .catch((err) => console.error(`Error synchronizing : ${err}`));
  } catch (error) {
    console.error(`Error connecting to database : ${error}`);
  }
};

export { connectDatabase, sequelize, DataTypes };
