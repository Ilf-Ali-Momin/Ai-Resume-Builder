const express = require("express");
const router = express.Router();
const { generateBoth } = require("../services/claudeService");
const { validateGenerateRequest } = require("../utils/validators");

router.post("/", async (req, res) => {
  try {
    const { userData, jobDescription, companyName, tone } = req.body;

    const validation = validateGenerateRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const result = await generateBoth(
      userData,
      jobDescription,
      companyName || "the company",
      tone || "professional"
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({
      error: "Generation failed",
      message: error.message,
    });
  }
});

module.exports = router;
