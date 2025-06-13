// pages/index.js
import { useState } from 'react';
import styles from '../styles/Home.module.css'; // CSS file

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input }),
      });

      const data = await res.json();
      setOutput(data.prediction || 'No prediction returned.');
    } catch (err) {
      setOutput('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧠 AI Disease Predictor</h1>

      <label className={styles.label}>Enter symptoms (comma separated):</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
        placeholder="e.g. fever, headache, sore throat"
      />

      <button onClick={handleSubmit} className={styles.button}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      <div className={styles.result}>
        <strong>Result:</strong>
        <p>{output}</p>
      </div>
    </div>
  );
}
