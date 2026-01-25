import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/dbConnection.js";

import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";

const app = express();
const PORT = process.env.port || 3000;

//middlewares
app.use(cors());
app.use(express.json());

connectDatabase();

//routes
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
