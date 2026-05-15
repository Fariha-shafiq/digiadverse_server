import { Router } from "express";

import upload from "../middleware/uploads.js";

import {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = Router();

// GET ALL
projectRouter.get("/", getAllProjects);

// GET BY SLUG
projectRouter.get("/slug/:slug", getProjectBySlug);

// GET BY ID
projectRouter.get("/id/:id", getProjectById);

// CREATE
projectRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createProject
);

// UPDATE
projectRouter.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProject
);

// DELETE
projectRouter.delete("/:id", deleteProject);

export default projectRouter;