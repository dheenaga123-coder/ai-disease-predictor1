import { useState } from 'react';

export default function SymptomForm({ onPredict }) {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(symptoms);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button type="submit">Predict</button>
    </form>
  );
}
