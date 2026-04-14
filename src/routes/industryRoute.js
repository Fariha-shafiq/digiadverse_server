import { Router } from "express";
import {getIndustries,getIndustryById,createIndustry,updateIndustry,deleteIndustry,} from "../controllers/industryController.js";

const industryRouter =Router();

industryRouter.get("/", getIndustries);
industryRouter.get("/:id", getIndustryById);
industryRouter.post("/", createIndustry);
industryRouter.put("/:id", updateIndustry);
industryRouter.delete("/:id", deleteIndustry);

export default industryRouter;