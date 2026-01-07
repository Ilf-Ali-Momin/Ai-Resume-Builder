const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

async function saveResume(userId, data) {
  try {
    const resumeRef = db.collection("resumes").doc();
    const resumeData = {
      id: resumeRef.id,
      userId,
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await resumeRef.set(resumeData);
    return { id: resumeRef.id, ...resumeData };
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error;
  }
}

async function getUserResumes(userId, limit = 10) {
  try {
    const snapshot = await db
      .collection("resumes")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
}

module.exports = {
  saveResume,
  getUserResumes,
};
