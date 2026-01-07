const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 2000;

async function generateWithClaude(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const message = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = message.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n");

      if (!content || content.trim().length < 100) {
        throw new Error("Generated content too short");
      }

      return content.trim();
    } catch (error) {
      console.error(`Attempt ${attempt}/${retries} failed:`, error.message);

      if (attempt === retries) {
        throw new Error(
          `Failed to generate after ${retries} attempts: ${error.message}`
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt))
      );
    }
  }
}

async function generateResume(userData, jobDescription, tone = "professional") {
  const { generateResumePrompt } = require("../prompts/resumePrompt");
  const prompt = generateResumePrompt(userData, jobDescription, tone);
  return await generateWithClaude(prompt);
}

async function generateCoverLetter(
  userData,
  jobDescription,
  companyName,
  tone = "professional"
) {
  const { generateCoverLetterPrompt } = require("../prompts/resumePrompt");
  const prompt = generateCoverLetterPrompt(
    userData,
    jobDescription,
    companyName,
    tone
  );
  return await generateWithClaude(prompt);
}

async function generateBoth(
  userData,
  jobDescription,
  companyName,
  tone = "professional"
) {
  try {
    const [resume, coverLetter] = await Promise.all([
      generateResume(userData, jobDescription, tone),
      generateCoverLetter(userData, jobDescription, companyName, tone),
    ]);

    return {
      resume,
      coverLetter,
      tone,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Generation error:", error);
    throw error;
  }
}

module.exports = {
  generateResume,
  generateCoverLetter,
  generateBoth,
};
