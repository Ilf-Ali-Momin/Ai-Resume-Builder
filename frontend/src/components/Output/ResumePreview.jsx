import { useState } from "react";
import Button from "../UI/Button";
import Loader from "../UI/Loader";

export default function ResumePreview({
  content,
  loading,
  onExport,
  exporting,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Resume</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCopy} disabled={loading}>
            {copied ? "✓ Copied" : "Copy"}
          </Button>
          <Button onClick={onExport} disabled={loading || exporting}>
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
