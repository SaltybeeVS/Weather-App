import React, { useEffect, useState } from 'react';
import { getForecast } from '../../Services/api';
import Card from '../Common/Card/Card.jsx';
import "./DailyForecast.modules.css";

function DailyForecast() {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getForecast('São Paulo', 2);
                setForecastData(data.forecast.forecastday);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchData();
        
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        
        return () => clearInterval(interval);
    }, []);

    const get24HourForecast = () => {
        if (!forecastData) return [];
        
        const now = new Date(currentTime);
        const today = forecastData[0];
        const tomorrow = forecastData[1] || today;
        const currentFloored = new Date(now);
        currentFloored.setMinutes(0, 0, 0);

        const startIndex = today.hour.findIndex(hour => {
            const hourDate = new Date(hour.time);
            return hourDate >= currentFloored;
        });

        const remainingToday = startIndex >= 0 
            ? today.hour.slice(startIndex)
            : [];
        
        const neededFromTomorrow = 24 - remainingToday.length;
        const tomorrowHours = tomorrow.hour.slice(0, neededFromTomorrow);
        
        return [...remainingToday, ...tomorrowHours]
            .slice(0, 15)
            .filter((_, index) => index % 3 === 0)
            .slice(0, 5)
            .map(hour => {
                const hourDate = new Date(hour.time);
                return {
                    ...hour,
                    isCurrent: hourDate.getTime() === currentFloored.getTime(),
                    isToday: hourDate.getDate() === now.getDate()
                };
            });
    };

    if (loading) return <div className="loading">Loading forecast...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <Card>
            <h2 className='DailyTitle'>Daily Forecast</h2>
            <div className="hourly-container">
                {get24HourForecast().map((hourData, index) => (
                    <div 
                        key={index} 
                        className={`hour-card`}
                    >
                        <p className="time">
                            {new Date(hourData.time).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit'
                            })}
                            <span className="day-label">
                                {hourData.isToday ? ' (today)' : ' (tomorrow)'}
                            </span>
                        </p>
                        <div className="weather-icon-container">
                            <img 
                                src={hourData.condition.icon} 
                                alt={hourData.condition.text} 
                                className="weather-icon"
                            />
                        </div>
                        <p className="temp">{hourData.temp_c}°C</p>
                        <p className="rain">
                            {hourData.chance_of_rain}% <span className="raindrop">💧</span>
                        </p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default DailyForecast;