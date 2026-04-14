import Project from "../models/projects.js";

export const getAllProjects = async (req, res) => {
  try {
    const { industry, featured } = req.query;

    let filter = {};

    if (industry) filter.industry = industry;
    if (featured) filter.featured = featured === "true";

    const projects = await Project.find(filter).populate("industry");

    res.json(projects);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("industry");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
export const createProject = async (req, res) => {
  try {
    
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
    const { title, description, industry, featured } = req.body || {};

    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    const newProject = new Project({
      title,
      description,
      industry,
      featured,
      imageUrl,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }

};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const { title, description, industry, featured } = req.body;

    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : undefined;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        industry,
        featured,
        ...(imageUrl && { imageUrl }),
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
