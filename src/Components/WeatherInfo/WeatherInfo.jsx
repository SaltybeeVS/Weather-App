import React, { useEffect, useState, useCallback } from 'react';
import { getForecast } from '../../Services/api';
import './WeatherInfo.modules.css';

/**
 * WeatherInfo component displays current weather information
 * @param {Object} location - Location data for weather query
 * @returns {JSX.Element} Weather information display card
 */
function WeatherInfo({ location }) {
    // Component state management
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoized fetch function with abort controller
    const fetchWeather = useCallback(async (abortController) => {
        try {
            let query = 'São Paulo'; // Default fallback location
            if (location) {
                query = location.lat && location.lon 
                    ? `${location.lat},${location.lon}`
                    : location.name;
            }
            
            const data = await getForecast(query, abortController);
            if (!abortController.signal.aborted) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (err) {
            if (!abortController.signal.aborted) {
                setError(err.message || 'Failed to load weather data');
                setLoading(false);
            }
        }
    }, [location]);

    // Weather data fetching effect
    useEffect(() => {
        const abortController = new AbortController();
        fetchWeather(abortController);

        return () => abortController.abort();
    }, [fetchWeather]);

    // Loading state
    if (loading) return <p className="status-message">Loading weather data...</p>;
    
    // Error state
    if (error) return <p className="status-message error">Error: {error}</p>;
    
    // No data state
    if (!weatherData) return <p className="status-message">Select a city to view weather</p>;

    // Main render
    return (
        <div className="weather-info" aria-live="polite">
            <div className="header-row">
                <h2 className="city-name" aria-label="City name">
                    {weatherData.location.name}
                </h2>
                <p className="temperature" aria-label="Current temperature">
                    {weatherData.current.temp_c}°C
                </p>
            </div>
            
            <div className="weather-details">
                <p className="rain-chance" aria-label="Chance of rain">
                    Chance of rain: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
                </p>
            </div>
        </div>
    );
}

export default React.memo(WeatherInfo);