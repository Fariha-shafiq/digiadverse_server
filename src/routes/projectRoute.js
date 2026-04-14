import {Router} from "express";
import upload from "../middleware/uploads.js"; 
import {getAllProjects,getProjectById,createProject,updateProject,deleteProject,} from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.post("/",upload.single("image"),  createProject);
projectRouter.put("/:id",upload.single("image"), updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;