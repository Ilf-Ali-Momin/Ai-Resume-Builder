import Input from '../UI/Input';

export default function PersonalInfo({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
      <p className="text-gray-600 mb-6">Let's start with your basic contact information</p>

      <div className="space-y-4">
        <Input
          label="Full Name"
          required
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
        />

        <Input
          label="Email"
          type="email"
          required
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />

        <Input
          label="Location"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
        />

        <Input
          label="LinkedIn URL"
          value={data.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/johndoe"
        />

        <Input
          label="Portfolio/Website"
          value={data.portfolio}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder="https://johndoe.com"
        />
      </div>
    </div>
  );
}
