import { Router } from "express";
import upload from "../middleware/uploads.js";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProject
);
projectRouter.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProject
);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
