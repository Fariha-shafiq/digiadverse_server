import {Router} from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
} from "../controllers/leadController.js";

import { validateLead } from "../middleware/validateLead.js";

const leadRouter = Router();

// PUBLIC
leadRouter.post("/", validateLead, createLead);

// ADMIN (protect later if needed)
leadRouter.get("/", getLeads);
leadRouter.put("/:id", updateLeadStatus);
leadRouter.delete("/:id", deleteLead);

export default leadRouter;