import express from "express";
import cors from "cors"
import path from "path"
import authRouter from "./routes/auth.js";
import serviceRouter from "./routes/serviceRoute.js";
import industryRouter from "./routes/industryRoute.js";
import projectRouter from "./routes/projectRoute.js";
import blogRouter from "./routes/blogRoute.js";
import leadRouter from "./routes/leadRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors({ origin: ["https://digiadverse.com", "http://localhost:5173"] }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter)
app.use("/api/projects", projectRouter)
app.use("/api/services", serviceRouter)
app.use("/api/industries", industryRouter)
app.use("/api/blogs", blogRouter)
app.use("/api/leads", leadRouter)
app.use("/api/upload", uploadRouter)

app.use(errorHandler)

export default app;
