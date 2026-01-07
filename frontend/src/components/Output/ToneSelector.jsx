const tones = [
  {
    id: "professional",
    label: "Professional",
    description: "Formal and corporate tone",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Contemporary and balanced",
  },
  {
    id: "confident",
    label: "Confident",
    description: "Strong and assertive",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Concise and direct",
  },
];

export default function ToneSelector({ currentTone, onToneChange, disabled }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Choose Your Tone
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => !disabled && onToneChange(tone.id)}
            disabled={disabled}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentTone === tone.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="font-medium text-gray-900 mb-1">{tone.label}</div>
            <div className="text-xs text-gray-600">{tone.description}</div>
          </button>
        ))}
      </div>

      {disabled && (
        <p className="mt-3 text-sm text-gray-500 italic">
          Regenerating content...
        </p>
      )}
    </div>
  );
}
