import React, { useEffect, useState } from 'react';
import { getForecast } from '../../Services/api'; // Cambia la importación
import './WeatherInfo.modules.css';

function WeatherInfo() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ciudad por defecto (puedes cambiarla o hacerla dinámica)
    const city = 'São Paulo';

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getForecast(city); // Usa getForecast en lugar de getCurrentWeather
                console.log(data); // Verifica la estructura de la respuesta
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="weather-info">
            {/* Nombre de la ciudad */}
            <h1 className="city-name">{weatherData.location.name}</h1>
            {/* Posibilidad de lluvia */}
            <p className="rain-chance">
                Posibilidad de lluvia: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
            </p>
            {/* Temperatura */}
            <p className="temperature">{weatherData.current.temp_c}°C</p>
        </div>
    );
}

export default WeatherInfo;