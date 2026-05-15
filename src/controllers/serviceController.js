// controllers/serviceController.js
import Service from "../models/services.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createService = async (req, res) => {
  try {
    const {
      // meta
      title, slug, tag, icon, order, isActive,
      // hero
      tagline, heroDescription, heroImage, ctaLabel, ctaLink,
      // sections
      projects, stats,
      detailHeading, detailBody, featureList,
      mockupImage, mockupCaption, mockupBgColor,
      expertiseSectionTitle, expertiseItems,
      solutionsSectionTitle, solutionItems,
      testimonials,
    } = req.body;

    const service = new Service({
      title, slug, tag, icon, order, isActive,
      tagline, heroDescription, heroImage, ctaLabel, ctaLink,
      projects, stats,
      detailHeading, detailBody, featureList,
      mockupImage, mockupCaption, mockupBgColor,
      expertiseSectionTitle, expertiseItems,
      solutionsSectionTitle, solutionItems,
      testimonials,
    });

    const saved = await service.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updateService can stay as-is — req.body spread handles all fields
export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};