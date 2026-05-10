export const validateLead = (req, res, next) => {
    let { name, email, message, company, budget, projectType } = req.body;
  
    // 🔹 Trim all inputs
    name = name?.trim();
    email = email?.trim();
    message = message?.trim();
    company = company?.trim();
    budget = budget?.trim();
    projectType = projectType?.trim();
  
    // 🔹 Basic sanitization (remove script tags)
    const sanitize = (str) =>
      str?.replace(/<[^>]*>?/gm, "");
  
    name = sanitize(name);
    email = sanitize(email);
    message = sanitize(message);
    company = sanitize(company);
    budget = sanitize(budget);
    projectType = sanitize(projectType);
  
    // 🔹 Email regex (simple but solid)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // 🔴 VALIDATIONS
  
    if (!name || name.length < 2 || name.length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters",
      });
    }
  
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Valid email is required",
      });
    }
  
    if (!message || message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        message: "Message must be between 10 and 1000 characters",
      });
    }
  
    // 🔹 Optional fields validation (only if provided)
  
    if (company && company.length > 100) {
      return res.status(400).json({
        message: "Company name is too long",
      });
    }
  
    if (budget && budget.length > 50) {
      return res.status(400).json({
        message: "Invalid budget value",
      });
    }
  
    if (projectType && projectType.length > 50) {
      return res.status(400).json({
        message: "Invalid project type",
      });
    }
  
    // 🔹 Assign sanitized values back
    req.body = {
      name,
      email,
      message,
      company: company || "",
      budget: budget || "",
      projectType: projectType || "",
    };
  
    next();
  };