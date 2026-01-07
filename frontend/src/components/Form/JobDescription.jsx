import Input from "../UI/Input";

export default function JobDescription({
  jobDescription,
  companyName,
  onJobDescriptionChange,
  onCompanyNameChange,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Description</h2>
      <p className="text-gray-600 mb-6">
        Paste the job description you're applying for. This helps tailor your
        resume and cover letter.
      </p>

      <div className="space-y-4">
        <Input
          label="Company Name (Optional)"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="e.g., Google, Microsoft, Acme Corp"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows="12"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste the complete job description here..."
          />
          <p className="mt-1 text-sm text-gray-500">
            {jobDescription.length} characters (minimum 50 required)
          </p>
        </div>
      </div>
    </div>
  );
}
