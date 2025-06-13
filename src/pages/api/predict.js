// pages/api/predict.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { symptoms } = req.body;

  try {
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Based on the symptoms: "${symptoms}", what are the possible diseases or conditions? Reply concisely.`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const prediction = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.status(200).json({ prediction });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch prediction from Gemini API.' });
  }
}
