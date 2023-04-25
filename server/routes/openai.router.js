const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const apikey = process.env.OPENAI_API_KEY;

router.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const openaiResponse = await axios.post(
      `https://api.openai.com/v1/engines/davinci/completions`,
      {
        prompt: prompt,
        max_tokens: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apikey}`,
        },
      }
    );

    res.json(openaiResponse.data.choices[0].text);
  } catch (error) {
    console.log("Error with OpenAI API:", error);
    res.status(500);
  }
});

module.exports = router;
