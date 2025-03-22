import React, { useEffect, useState } from "react";
import { getForecast } from "../../Services/api";
import Card from "../Common/Card/Card";
import './WeeklyForecast.modules.css';

function WeeklyForecast({ location }) {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                let query = 'São Paulo';
                if (location) {
                    query = location.lat && location.lon 
                        ? `${location.lat},${location.lon}`
                        : typeof location === 'string' ? location : location.name;
                }
                const data = await getForecast(query);
                setForecast(data.forecast.forecastday);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchForecast();
    }, [location]);

    return (
        <Card className="forecast">
            <h2>Weekly Forecast</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {forecast.slice(1).map((day, index) => (
                        <li key={day.date}>
                            <div className="forecast-day">
                                <span className="day-name">
                                    {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: "long" })}
                                </span>
                                <img 
                                    src={day.day.condition.icon} 
                                    alt={day.day.condition.text} 
                                    className="weather-icon"
                                />
                                <span className="temperatures">
                                    <span className="max-temp">{day.day.maxtemp_c}°C</span> /{' '}
                                    <span className="min-temp">{day.day.mintemp_c}°C</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}

export default WeeklyForecast;