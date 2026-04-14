import express from "express";
import cors from "cors"
import path from "path"
import authRouter from "./routes/auth.js";
import serviceRouter from "./routes/serviceRoute.js";
import industryRouter from "./routes/industryRoute.js";
import projectRouter from "./routes/projectRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter)
app.use("/api/projects", projectRouter)
app.use("/api/services", serviceRouter)
app.use("/api/industries", industryRouter)

export default app;
