import Blog from "../models/blogs.js";
import asyncHandler from "../middleware/asyncHandler.js";
import slugify from "../utils/slugify.js";

// 🔹 CREATE BLOG
export const createBlog = asyncHandler(async (req, res) => {
  const { title, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const slug = slugify(title);

  // prevent duplicate slug
  const existing = await Blog.findOne({ slug });
  if (existing) {
    return res.status(400).json({
      message: "Blog with same title already exists",
    });
  }

  // 🔹 HANDLE IMAGE
  const imagePath = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  // 🔹 HANDLE TAGS (FormData sends as string OR array)
  let tags = req.body["tags[]"] || req.body.tags || [];
  if (typeof tags === "string") tags = [tags];

  const blog = await Blog.create({
    ...req.body,
    tags,
    slug,
    featuredImage: imagePath,
    publishedAt:
      status === "published" ? new Date() : null,
  });

  res.status(201).json(blog);
});


// 🔹 GET ALL BLOGS (PUBLIC)
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "published" })
    .sort({ createdAt: -1 });

  res.json(blogs);
});


// 🔹 GET SINGLE BLOG (PUBLIC - SLUG)
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
});


// 🔹 GET SINGLE BLOG (ADMIN - ID)
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
});


// 🔹 UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // 🔹 UPDATE SLUG IF TITLE CHANGED
  if (req.body.title && req.body.title !== blog.title) {
    const newSlug = slugify(req.body.title);

    const existing = await Blog.findOne({
      slug: newSlug,
      _id: { $ne: blog._id },
    });

    if (existing) {
      return res.status(400).json({
        message: "Another blog with same title exists",
      });
    }

    blog.slug = newSlug;
  }

  // 🔹 HANDLE IMAGE UPDATE
  if (req.file) {
    blog.featuredImage = `/uploads/${req.file.filename}`;
  }

  // 🔹 HANDLE TAGS
  let tags = req.body["tags[]"] || req.body.tags;
  if (tags) {
    if (typeof tags === "string") tags = [tags];
    blog.tags = tags;
  }

  // 🔹 ASSIGN OTHER FIELDS
  Object.assign(blog, req.body);

  // 🔹 HANDLE PUBLISH DATE
  if (req.body.status === "published" && !blog.publishedAt) {
    blog.publishedAt = new Date();
  }

  const updated = await blog.save();

  res.json(updated);
});


// 🔹 DELETE BLOG
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await blog.deleteOne();

  res.json({ message: "Blog deleted successfully" });
});