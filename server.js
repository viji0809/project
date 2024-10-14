const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Make sure to use axios here
require('dotenv').config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to get weather data
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = '34bcb69fbd72979b539afc6d09c1ede2'; // Ensure this is set in your .env file
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const weatherData = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            city: data.name,
        };

        res.json(weatherData);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ message: error.response.data.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
