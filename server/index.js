import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connectDB/connectDB.js";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import blogRouter from "./Routes/blogRoutes.js";
import userDetailsRouter from "./Routes/userDetailsRouts.js";
dotenv.config();

let PORT = process.env.PORT || 2000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api/auth", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userDetailsRouter);

app.get("/", (req, resp) => {
  resp.send("Hello Sinope Server is running");
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});

export default app;
