import Industry from "../models/industry.js";

// GET all industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single industry
export const getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }

    res.json(industry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE industry
export const createIndustry = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const industry = new Industry({ title, description, imageUrl });
    const savedIndustry = await industry.save();

    res.status(201).json(savedIndustry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE industry
export const updateIndustry = async (req, res) => {
  try {
    const updated = await Industry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Industry not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE industry
export const deleteIndustry = async (req, res) => {
  try {
    const deleted = await Industry.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Industry not found" });
    }

    res.json({ message: "Industry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};