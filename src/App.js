import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const getWeather = async () => {
        setError(null); // Reset error state
        try {
            const response = await fetch(`http://localhost:5000/weather/${city}`);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An unexpected error occurred.'); // Use the message from the backend
                setWeatherData(null);
            }
        } catch (err) {
            setError('An error occurred while fetching the weather data.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            getWeather();
        }
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.city}</h2>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Condition: {weatherData.description}</p>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;
