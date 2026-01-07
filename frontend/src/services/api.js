const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Request failed",
      message: response.statusText,
    }));
    throw new Error(error.message || error.error || "Request failed");
  }
  return response.json();
}

export async function generateContent({
  userData,
  jobDescription,
  companyName,
  tone,
}) {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userData,
      jobDescription,
      companyName,
      tone,
    }),
  });

  return handleResponse(response);
}

export async function exportToPdf(content, type, filename) {
  const response = await fetch(`${API_URL}/api/pdf/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      type,
      filename,
    }),
  });

  if (!response.ok) {
    throw new Error("PDF export failed");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export async function saveResume(userId, data) {
  const response = await fetch(`${API_URL}/api/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      data,
    }),
  });

  return handleResponse(response);
}

export async function getUserResumes(userId) {
  const response = await fetch(`${API_URL}/api/save/user/${userId}`);
  return handleResponse(response);
}
