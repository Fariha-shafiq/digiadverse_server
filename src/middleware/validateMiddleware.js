export const validateBlog = (req, res, next) => {
    const { title, content, category } = req.body;
  
    if (!title || title.length < 5) {
      return res.status(400).json({ message: "Title must be at least 5 characters" });
    }
  
    if (!content || content.length < 20) {
      return res.status(400).json({ message: "Content must be at least 20 characters" });
    }
  
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
  
    next();
  };