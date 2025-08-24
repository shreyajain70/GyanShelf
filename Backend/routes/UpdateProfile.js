const express = require("express");
const router = express.Router();
const SignUpSchema = require("../models/SignUpSchema");

// ✅ Get user details by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await SignUpSchema.findById(req.params.id).select("-Password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ✅ Update user profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await SignUpSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-Password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ Update error:", err.message);
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
});

module.exports = router;
