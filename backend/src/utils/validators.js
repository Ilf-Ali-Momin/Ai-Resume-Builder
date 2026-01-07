function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateGenerateRequest(body) {
  const errors = [];

  if (!body.userData) {
    errors.push("userData is required");
    return { valid: false, errors };
  }

  const { userData, jobDescription } = body;

  if (!userData.personalInfo || !userData.personalInfo.fullName) {
    errors.push("Full name is required");
  }

  if (!userData.personalInfo || !validateEmail(userData.personalInfo.email)) {
    errors.push("Valid email is required");
  }

  if (!userData.experience || userData.experience.length === 0) {
    errors.push("At least one work experience is required");
  }

  if (!userData.education || userData.education.length === 0) {
    errors.push("At least one education entry is required");
  }

  if (!userData.skills || userData.skills.length === 0) {
    errors.push("At least one skill is required");
  }

  if (!jobDescription || jobDescription.trim().length < 50) {
    errors.push("Job description must be at least 50 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateGenerateRequest,
  validateEmail,
};
