
const express = require('express')
require('dotenv').config()
const { GoogleGenAI } = require("@google/genai")

const app = express()

const PORT = process.env.URL_PORT || 3000

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const weather = process.env.WEATHER_KEY;


app.get('/gemini', async (req, res) => {

    const response = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: "List 5 simple outfits to wear on a rainy day. Only give a numbered list with short, clear answers. Do not include explanations, formatting, or extra text.",
    });


    let text = '';

    for await (const chunk of response) {
        text += chunk.text ?? '';
    }

    const items = text
        .split(/\n+/) // split by line breaks
        .map(line => line.replace(/^\d+\.\s*/, '').trim()) // remove "1. ", "2. ", etc.
        .filter(item => item.length > 0); // remove empty lines

    res.status(200).json({ result: items });
})

app.get('/weather', async (req, res) => {

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather}&q=philippines&aqi=yes`, {
        method: "GET",
    });

    const data = await response.json()

    res.status(200).json(data);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
