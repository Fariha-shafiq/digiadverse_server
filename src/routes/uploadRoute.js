import { Router } from "express";
import upload from "../middleware/uploads.js";

const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default uploadRouter;
