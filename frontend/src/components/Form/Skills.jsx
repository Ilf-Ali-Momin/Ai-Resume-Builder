import { useState } from "react";
import Button from "../UI/Button";

export default function Skills({ data, onChange }) {
  const [skills, setSkills] = useState(data.length > 0 ? data : []);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      const updated = [...skills, inputValue.trim()];
      setSkills(updated);
      onChange(updated);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
      <p className="text-gray-600 mb-6">Add your relevant skills</p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., React, Python, Project Management"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button onClick={handleAdd} disabled={!inputValue.trim()}>
            Add
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {skills.length === 0 && (
          <p className="text-sm text-gray-500 italic">
            No skills added yet. Add at least one skill to continue.
          </p>
        )}
      </div>
    </div>
  );
}
