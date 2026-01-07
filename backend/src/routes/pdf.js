const express = require("express");
const router = express.Router();
const { generatePdf } = require("../services/pdfService");

router.post("/generate", async (req, res) => {
  try {
    const { content, type, filename } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const pdfBuffer = await generatePdf(content, type || "resume");

    const downloadFilename = filename || `${type}_${Date.now()}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${downloadFilename}"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({
      error: "Failed to generate PDF",
      message: error.message,
    });
  }
});

module.exports = router;
