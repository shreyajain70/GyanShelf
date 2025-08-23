// routes/sellRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const SellSchema = require("../models/SellSchema");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: "dvar19ztb",
  api_key: "814112953766756",
  api_secret: "d5WgUrNC2KbHJfzV0pBCatksgoQ",
});

// 🔹 Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "book_uploads",
    format: path.extname(file.originalname).replace(".", ""), // keep original extension
    public_id: Date.now().toString(),
    resource_type: "image",
  }),
});

const upload = multer({ storage });

// ====== POST /sell/upload ======
// expects form-data with fields + images
// FrontImage[] and BackImage[]
router.post(
  "/upload",
  upload.fields([
    { name: "FrontImage", maxCount: 5 }, // allow multiple images
    { name: "BackImage", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const {
        Title,
        Description,
        Class,
        Board,
        Edition,
        MRP,
        Quality,
        IAgree,
        userId,
      } = req.body;

      if (
        !Title ||
        !Description ||
        !Class ||
        !Board ||
        !Edition ||
        !MRP ||
        !Quality ||
        !IAgree ||
        !userId
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // get Cloudinary URLs
      const frontImages =
        req.files["FrontImage"]?.map((file) => file.path) || [];
      const backImages =
        req.files["BackImage"]?.map((file) => file.path) || [];

      if (frontImages.length === 0 || backImages.length === 0) {
        return res.status(400).json({ error: "Both front & back images required" });
      }

      const newBook = new SellSchema({
        Title,
        Description,
        Class,
        Board,
        Edition,
        FrontImage: frontImages,
        BackImage: backImages,
        MRP,
        Quality,
        IAgree,
        userId,
      });

      await newBook.save();

      res.json({
        message: "✅ Book uploaded successfully",
        book: newBook,
      });
    } catch (err) {
      console.error("❌ Upload error:", err);
      res.status(500).json({ error: "Failed to save book" });
    }
  }
);

module.exports = router;
