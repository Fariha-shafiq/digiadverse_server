// controllers/projectController.js

import Project from "../models/projects.js";

// GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const { industry, featured, service } = req.query;

    let filter = {};

    if (industry) filter.industry = industry;

    if (featured) {
      filter.featured = featured === "true";
    }

    if (service) {
      filter.services = service;
    }

    const projects = await Project.find(filter)
      .populate("industry")
      .populate("services")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET PROJECT BY SLUG
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    })
      .populate("industry")
      .populate("services");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("GET PROJECT SLUG ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("industry")
      .populate("services");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("GET PROJECT ID ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

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

    // SINGLE IMAGE
    const imageUrl = req.files?.image
      ? `http://72.62.67.232/uploads/${req.files.image[0].filename}`
      : "";

    // GALLERY IMAGES
    const galleryImages = req.files?.galleryImages
      ? req.files.galleryImages.map(
          (file) => `http://72.62.67.232/uploads/${file.filename}`
        )
      : [];

    // SERVICES ARRAY
    const parsedServices = services
      ? Array.isArray(services)
        ? services
        : [services]
      : [];

    // FEATURES ARRAY
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
    console.error("CREATE PROJECT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE PROJECT
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

    // SINGLE IMAGE
    const imageUrl = req.files?.image
      ? `http://72.62.67.232/uploads/${req.files.image[0].filename}`
      : undefined;

    // GALLERY IMAGES
    const galleryImages = req.files?.galleryImages
      ? req.files.galleryImages.map(
          (file) => `http://72.62.67.232/uploads/${file.filename}`
        )
      : undefined;

    // SERVICES ARRAY
    const parsedServices = services
      ? Array.isArray(services)
        ? services
        : [services]
      : undefined;

    // FEATURES ARRAY
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
        featured,
        clientName,
        challenges,
        solution,

        ...(parsedServices !== undefined && {
          services: parsedServices,
        }),

        ...(parsedFeatures !== undefined && {
          keyFeatures: parsedFeatures,
        }),

        ...(galleryImages !== undefined && {
          galleryImages,
        }),

        ...(imageUrl !== undefined && {
          imageUrl,
        }),
      },
      {
        new: true,
      }
    )
      .populate("industry")
      .populate("services");

    if (!updatedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};