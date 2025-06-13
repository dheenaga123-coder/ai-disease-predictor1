import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { symptoms } = req.body;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Given the symptoms: ${symptoms}, what are the likely diseases? Reply briefly.`,
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

    const prediction =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No prediction returned.';
    res.status(200).json({ prediction });
  } catch (error) {
    console.error('❌ Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get prediction from Gemini API.' });
  }
}
