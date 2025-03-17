import React, { useEffect, useState } from "react";
import { getForecast } from "../../Services/api";
import Card from "../Common/Card/Card";
import './WeeklyForecast.modules.css';
import { FaTemperatureHigh } from "react-icons/fa";
import WeatherIcon from "../Common/WeatherIcon/WeatherIcon";

function WeeklyForecast({ location }) {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const data = await getForecast(location);
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
                    {forecast.slice(1).map((day, index) => ( // Salta el primer índice (índice 0)
                        <li key={day.date}>
                            <div className="forecast-day">
                                <span className="day-name">
                                    {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: "long" })}
                                </span>
                                <span className="weather-condition"><WeatherIcon code={day.day.condition.code}/></span>
                                <span className="temperatures">
                                    <span className="max-temp">{day.day.maxtemp_c}°C</span> /{' '}
                                    <span className="min-temp">{day.day.mintemp_c}°C</span>
                                </span>
                                <span className="weather-icon"><FaTemperatureHigh /></span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}

export default WeeklyForecast;