import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

export default function Experience({ data, onChange }) {
  const [experiences, setExperiences] = useState(
    data.length > 0
      ? data
      : [
          {
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          },
        ]
  );

  const handleAdd = () => {
    const updated = [
      ...experiences,
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ];
    setExperiences(updated);
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = experiences.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setExperiences(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
      <p className="text-gray-600 mb-6">Add your relevant work experience</p>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 relative"
          >
            {experiences.length > 1 && (
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}

            <div className="space-y-4">
              <Input
                label="Job Title"
                required
                value={exp.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Software Engineer"
              />

              <Input
                label="Company"
                required
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="Tech Corp"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(index, "startDate", e.target.value)
                  }
                />

                <Input
                  label="End Date"
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(index, "endDate", e.target.value)
                  }
                  disabled={exp.current}
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => {
                    handleChange(index, "current", e.target.checked);
                    if (e.target.checked) {
                      handleChange(index, "endDate", "");
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">
                  I currently work here
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          </div>
        ))}

        <Button variant="secondary" onClick={handleAdd} fullWidth>
          + Add Another Experience
        </Button>
      </div>
    </div>
  );
}
