import { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Education from "./components/Form/Education";
import Experience from "./components/Form/Experience";
import JobDescription from "./components/Form/JobDescription";
import PersonalInfo from "./components/Form/PersonalInfo";
import Skills from "./components/Form/Skills";
import CoverLetterPreview from "./components/Output/CoverLetterPreview";
import ResumePreview from "./components/Output/ResumePreview";
import ToneSelector from "./components/Output/ToneSelector";
import Button from "./components/UI/Button";
import Loader from "./components/UI/Loader";
import { useAuth } from "./hooks/useAuth";
import { exportToPdf, generateContent } from "./services/api";

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [userData, setUserData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tone, setTone] = useState("professional");
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !userData.personalInfo.email) {
      setUserData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          email: user.email,
        },
      }));
    }
  }, [user]);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleGenerate = async () => {
    setError(null);
    setGenerating(true);

    try {
      const result = await generateContent({
        userData,
        jobDescription,
        companyName,
        tone,
      });

      setGenerated(result.data);
      setStep(6);
    } catch (err) {
      setError(err.message || "Failed to generate content. Please try again.");
      console.error("Generation error:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = async (newTone) => {
    setTone(newTone);
    setError(null);
    setGenerating(true);

    try {
      const result = await generateContent({
        userData,
        jobDescription,
        companyName,
        tone: newTone,
      });

      setGenerated(result.data);
    } catch (err) {
      setError(err.message || "Failed to regenerate content.");
    } finally {
      setGenerating(false);
    }
  };

  const handleExportPdf = async (type) => {
    setExporting(true);
    try {
      if (type === "both") {
        await exportToPdf(
          generated.resume,
          "resume",
          `${userData.personalInfo.fullName}_Resume.pdf`
        );
        await exportToPdf(
          generated.coverLetter,
          "cover-letter",
          `${userData.personalInfo.fullName}_CoverLetter.pdf`
        );
      } else {
        const content =
          type === "resume" ? generated.resume : generated.coverLetter;
        const filename =
          type === "resume"
            ? `${userData.personalInfo.fullName}_Resume.pdf`
            : `${userData.personalInfo.fullName}_CoverLetter.pdf`;
        await exportToPdf(content, type, filename);
      }
    } catch (err) {
      setError("Failed to export PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const canProceedToNext = () => {
    switch (step) {
      case 1:
        return userData.personalInfo.fullName && userData.personalInfo.email;
      case 2:
        return userData.experience.length > 0;
      case 3:
        return userData.education.length > 0;
      case 4:
        return userData.skills.length > 0;
      case 5:
        return jobDescription.length >= 50;
      default:
        return true;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          {showSignup ? (
            <Signup onToggle={() => setShowSignup(false)} />
          ) : (
            <Login onToggle={() => setShowSignup(true)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Resume Builder
              </h1>
              <p className="text-sm text-gray-600">
                Create ATS-optimized resumes and cover letters
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {step <= 5 && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {step === 1 && (
          <PersonalInfo
            data={userData.personalInfo}
            onChange={(data) =>
              setUserData((prev) => ({ ...prev, personalInfo: data }))
            }
          />
        )}

        {step === 2 && (
          <Experience
            data={userData.experience}
            onChange={(data) =>
              setUserData((prev) => ({ ...prev, experience: data }))
            }
          />
        )}

        {step === 3 && (
          <Education
            data={userData.education}
            onChange={(data) =>
              setUserData((prev) => ({ ...prev, education: data }))
            }
          />
        )}

        {step === 4 && (
          <Skills
            data={userData.skills}
            onChange={(data) =>
              setUserData((prev) => ({ ...prev, skills: data }))
            }
          />
        )}

        {step === 5 && (
          <JobDescription
            jobDescription={jobDescription}
            companyName={companyName}
            onJobDescriptionChange={setJobDescription}
            onCompanyNameChange={setCompanyName}
          />
        )}

        {step === 6 && generated && (
          <div className="space-y-6">
            <ToneSelector
              currentTone={tone}
              onToneChange={handleRegenerate}
              disabled={generating}
            />

            <ResumePreview
              content={generated.resume}
              loading={generating}
              onExport={() => handleExportPdf("resume")}
              exporting={exporting}
            />

            <CoverLetterPreview
              content={generated.coverLetter}
              loading={generating}
              onExport={() => handleExportPdf("cover-letter")}
              exporting={exporting}
            />

            <div className="flex gap-4">
              <Button
                onClick={() => handleExportPdf("both")}
                disabled={exporting}
                fullWidth
              >
                {exporting ? "Exporting..." : "Export Both as PDF"}
              </Button>
              <Button variant="secondary" onClick={() => setStep(1)} fullWidth>
                Start New
              </Button>
            </div>
          </div>
        )}

        {step <= 5 && (
          <div className="mt-8 flex gap-4">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}

            {step < 5 && (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceedToNext()}
                fullWidth
              >
                Next
              </Button>
            )}

            {step === 5 && (
              <Button
                onClick={handleGenerate}
                disabled={!canProceedToNext() || generating}
                fullWidth
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size="small" />
                    Generating...
                  </span>
                ) : (
                  "Generate Resume & Cover Letter"
                )}
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
