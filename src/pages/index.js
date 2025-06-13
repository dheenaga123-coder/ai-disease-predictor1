import { useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import PredictionResult from '../components/PredictionResult';

export default function Home() {
  const [prediction, setPrediction] = useState('');

  const handlePredict = async (symptoms) => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h1>AI Disease Predictor</h1>
      <SymptomForm onPredict={handlePredict} />
      <PredictionResult prediction={prediction} />
    </div>
  );
}
