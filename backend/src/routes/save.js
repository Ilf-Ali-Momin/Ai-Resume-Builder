const express = require("express");
const router = express.Router();
const { saveResume, getUserResumes } = require("../services/firebaseService");

router.post("/", async (req, res) => {
  try {
    const { userId, data } = req.body;
    const result = await saveResume(userId, data);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to save", message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await getUserResumes(userId);
    res.json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch", message: error.message });
  }
});

module.exports = router;
