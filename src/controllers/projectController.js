import Project from "../models/projects.js";

// GET ALL
export const getAllProjects = async (req, res) => {
  try {
    const { industry, featured, service } = req.query;

    let filter = {};

    if (industry) filter.industry = industry;
    if (featured) filter.featured = featured === "true";
    if (service) filter.services = service; 

    const projects = await Project.find(filter)
      .populate("industry")
      .populate("services"); 

    res.json(projects);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("industry")
      .populate("services"); 

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

    const {
      title,
      slug,
      description,
      shortDescription,
      industry,
      services,
      featured,
      clientName,
      keyFeatures,
      challenges,
      solution,
    } = req.body || {};

    const imageUrl = req.files?.image
    ? `http://localhost:5000/uploads/${req.files.image[0].filename}`
    : "";

      const galleryImages = req.files?.galleryImages
  ? req.files.galleryImages.map(
      (file) => `http://localhost:5000/uploads/${file.filename}`
    )
  : [];

    // Handle arrays safely
    const parsedServices = services
      ? Array.isArray(services)
        ? services
        : [services]
      : [];

    const parsedFeatures = keyFeatures
      ? Array.isArray(keyFeatures)
        ? keyFeatures
        : [keyFeatures]
      : [];

    const newProject = new Project({
      title,
      slug,
      description,
      shortDescription,
      industry,
      services: parsedServices,
      featured,
      imageUrl,
      clientName,
      galleryImages,
      keyFeatures: parsedFeatures,
      challenges,
      solution,
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
    const {
      title,
      slug,
      description,
      shortDescription,
      industry,
      services,
      featured,
      clientName,
      keyFeatures,
      challenges,
      solution,
    } = req.body;

    const imageUrl = req.files?.image
    ? `http://localhost:5000/uploads/${req.files.image[0].filename}`
    : undefined;

    const galleryImages = req.files?.galleryImages
  ? req.files.galleryImages.map(
      (file) => `http://localhost:5000/uploads/${file.filename}`
    )
  : undefined;

    // Handle arrays safely
    const parsedServices = services
      ? Array.isArray(services)
        ? services
        : [services]
      : undefined;

    const parsedFeatures = keyFeatures
      ? Array.isArray(keyFeatures)
        ? keyFeatures
        : [keyFeatures]
      : undefined;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        description,
        shortDescription,
        industry,
        ...(parsedServices && { services: parsedServices }),
        featured,
        clientName,
        ...(galleryImages && { galleryImages }),
        ...(parsedFeatures && { keyFeatures: parsedFeatures }),
        challenges,
        solution,
        ...(imageUrl && { imageUrl }),
      },
      { new: true }
    )
      .populate("industry")
      .populate("services"); // keep response consistent

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