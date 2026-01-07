const puppeteer = require("puppeteer");

function formatContentToHtml(content, type = "resume") {
  let html = content
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^\* (.+)$/gm, "<li>$1</li>")
    .replace(/^• (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

  if (!html.startsWith("<")) {
    html = "<p>" + html + "</p>";
  }

  return html;
}

function generatePdfHtml(content, type = "resume") {
  const formattedContent = formatContentToHtml(content, type);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${type === "resume" ? "Resume" : "Cover Letter"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #000; padding: 0.5in; max-width: 8.5in; }
    h1 { font-size: 20pt; font-weight: bold; margin-bottom: 4pt; }
    h2 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; padding-bottom: 2pt; border-bottom: 1px solid #333; text-transform: uppercase; }
    h3 { font-size: 11pt; font-weight: bold; margin-top: 8pt; margin-bottom: 4pt; }
    p { margin-bottom: 6pt; }
    ul { margin-left: 20pt; margin-bottom: 8pt; }
    li { margin-bottom: 3pt; line-height: 1.3; }
  </style>
</head>
<body>
  ${formattedContent}
</body>
</html>`;
}

async function generatePdf(content, type = "resume") {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    const html = generatePdfHtml(content, type);
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = {
  generatePdf,
};
