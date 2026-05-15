import { Router } from "express";
import {getServices,getServiceById,createService,updateService,deleteService,getServiceBySlug}from "../controllers/serviceController.js";
const serviceRouter=Router();

serviceRouter.get("/", getServices);
serviceRouter.get("/slug/:slug", getServiceBySlug);
serviceRouter.get("/:id", getServiceById);
serviceRouter.post("/", createService);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;