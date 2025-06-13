// pages/index.js
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebaseConfig";

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // 🧠 Prediction
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

  // 📁 Upload file
  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file!");
    const storageRef = ref(storage, `uploads/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      alert("✅ File uploaded!");
      setFile(null);
      fetchUploadedFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed");
    }
  };

  // 📂 Load existing files
  const fetchUploadedFiles = async () => {
    const uploadsRef = ref(storage, "uploads/");
    try {
      const result = await listAll(uploadsRef);
      const urls = await Promise.all(
        result.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setUploadedFiles(urls);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧠 AI Disease Predictor</h1>

      {/* Symptom Input */}
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

      {/* File Upload Section */}
      <hr style={{ margin: "40px 0" }} />
      <h2 className={styles.title}>📁 Upload Reports</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleFileUpload} className={styles.button} style={{ marginTop: "10px" }}>
        Upload File
      </button>

      <div className={styles.result}>
        <h3>Uploaded Files:</h3>
        <ul>
          {uploadedFiles.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
