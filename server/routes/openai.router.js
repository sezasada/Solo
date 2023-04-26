const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
router.use(express.json());
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${openaiApiKey}`,
};

router.post('/generate', async (req, res) => {
  try {
    const input = req.body.text;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: `${input}`}],
      },
      { headers }
    );

    const chatGptResponse = response.data.choices[0].message.content;

    console.log(chatGptResponse);
    res.status(200).json({ message: chatGptResponse });
  } catch (err) {
    console.log('Error: ' + err);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
