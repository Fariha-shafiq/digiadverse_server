// models/services.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectTitle:    { type: String, required: true },
  projectImage:    { type: String, default: "" },
  projectCategory: { type: String, default: "" },
  projectLink:     { type: String, default: "" },
});

const statSchema = new mongoose.Schema({
  value:  { type: String, required: true },
  label:  { type: String, required: true },
  suffix: { type: String, default: "" },
});

const featureSchema = new mongoose.Schema({
  icon: { type: String, default: "" },
  text: { type: String, required: true },
});

const expertiseSchema = new mongoose.Schema({
  icon:        { type: String, default: "" },
  title:       { type: String, required: true },
  description: { type: String, default: "" },
});

const solutionSchema = new mongoose.Schema({
  icon:        { type: String, default: "" },
  title:       { type: String, required: true },
  description: { type: String, default: "" },
  tag:         { type: String, default: "" },
});

const testimonialSchema = new mongoose.Schema({
  quote:  { type: String, required: true },
  author: { type: String, required: true },
  role:   { type: String, default: "" },
  avatar: { type: String, default: "" },
});

const serviceSchema = new mongoose.Schema(
  {
    // ── Meta ──────────────────────────────────────
    title:    { type: String, required: true, unique: true },
    slug:     { type: String, required: true, unique: true },
    tag:      { type: String, default: "" },
    icon:     { type: String, default: "" },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    // ── Hero (ServicesDisplay) ─────────────────────
    description:     { type: String, default: "" },
    tagline:         { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    heroImage:       { type: String, default: "" },
    ctaLabel:        { type: String, default: "Get Started" },
    ctaLink:         { type: String, default: "/contact" },

    // ── ServiceStats ───────────────────────────────
    stats: { type: [statSchema], default: [] },

    // ── ServiceDetails ─────────────────────────────
    detailHeading: { type: String, default: "" },
    detailBody:    { type: String, default: "" },
    featureList:   { type: [featureSchema], default: [] },

    // ── ServiceImage ───────────────────────────────
    mockupImage:   { type: String, default: "" },
    mockupCaption: { type: String, default: "" },
    mockupBgColor: { type: String, default: "#000000" },

    // ── ExpertiseSection ───────────────────────────
    expertiseSectionTitle: { type: String, default: "" },
    expertiseItems:        { type: [expertiseSchema], default: [] },

    // ── SolutionsSection ───────────────────────────
    solutionsSectionTitle: { type: String, default: "" },
    solutionItems:         { type: [solutionSchema], default: [] },
  },
  { timestamps: true }
);

const Service = mongoose.model("Services", serviceSchema);
export default Service;