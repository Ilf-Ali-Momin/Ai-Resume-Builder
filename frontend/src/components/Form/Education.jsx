import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

export default function Education({ data, onChange }) {
  const [education, setEducation] = useState(
    data.length > 0
      ? data
      : [
          {
            degree: "",
            field: "",
            institution: "",
            graduationDate: "",
            achievements: "",
          },
        ]
  );

  const handleAdd = () => {
    const updated = [
      ...education,
      {
        degree: "",
        field: "",
        institution: "",
        graduationDate: "",
        achievements: "",
      },
    ];
    setEducation(updated);
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setEducation(updated);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
      <p className="text-gray-600 mb-6">Add your educational background</p>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 relative"
          >
            {education.length > 1 && (
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}

            <div className="space-y-4">
              <Input
                label="Degree"
                required
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />

              <Input
                label="Field of Study"
                required
                value={edu.field}
                onChange={(e) => handleChange(index, "field", e.target.value)}
                placeholder="Computer Science"
              />

              <Input
                label="Institution"
                required
                value={edu.institution}
                onChange={(e) =>
                  handleChange(index, "institution", e.target.value)
                }
                placeholder="University of California"
              />

              <Input
                label="Graduation Date"
                type="month"
                value={edu.graduationDate}
                onChange={(e) =>
                  handleChange(index, "graduationDate", e.target.value)
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Achievements (Optional)
                </label>
                <textarea
                  value={edu.achievements}
                  onChange={(e) =>
                    handleChange(index, "achievements", e.target.value)
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="GPA, honors, relevant coursework, etc."
                />
              </div>
            </div>
          </div>
        ))}

        <Button variant="secondary" onClick={handleAdd} fullWidth>
          + Add Another Education
        </Button>
      </div>
    </div>
  );
}
