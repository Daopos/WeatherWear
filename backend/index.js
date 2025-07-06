
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { GoogleGenAI } = require("@google/genai")


const app = express()

app.use(cors());
app.use(express.json())

const PORT = process.env.URL_PORT || 3000

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const weather = process.env.WEATHER_KEY;


app.get('/gemini', async (req, res) => {
    try {
        const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather}&q=philippines&aqi=yes`);
        const weatherData = await weatherRes.json();

        const condition = weatherData.current?.condition?.text ?? 'unknown weather';
        const temp = weatherData.current?.temp_c ?? 'unknown temperature';
        const location = weatherData.location?.name ?? 'your area';

        const prompt = `The current weather in ${location} is ${condition.toLowerCase()} with ${temp}°C. Based on this, list 5 simple outfits to wear today. Only give a numbered list with short, clear answers. Do not include explanations, formatting, or extra text.`;

        const response = await ai.models.generateContentStream({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        let text = '';
        for await (const chunk of response) {
            text += chunk.text ?? '';
        }

        const items = text
            .split(/\n+/)
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(item => item.length > 0);

        res.status(200).json({ weather: condition, temperature: temp, result: items });

    } catch (err) {
        console.error('Error generating content:', err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.get('/weather', async (req, res) => {

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather}&q=philippines&aqi=yes`, {
        method: "GET",
    });

    const data = await response.json()

    res.status(200).json(data);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
