import Lead from "../models/leads.js";
import asyncHandler from "../middleware/asyncHandler.js";

// CREATE LEAD
export const createLead = asyncHandler(async (req, res) => {
  const { name, email, company, budget, projectType, message } = req.body;

  const lead = await Lead.create({
    name,
    email,
    company,
    budget,
    projectType,
    message,
  });

  res.status(201).json({
    message: "Lead submitted successfully",
    data: lead,
  });
});

// GET ALL LEADS
export const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });

  res.status(200).json({
    data: leads,
  });
});

// UPDATE STATUS
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  lead.status = status || lead.status;

  await lead.save();

  res.json({
    message: "Lead updated",
    data: lead,
  });
});

// DELETE LEAD
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  await lead.deleteOne();

  res.json({
    message: "Lead deleted",
  });
});