import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getForecast } from '../../Services/api';
import Card from '../Common/Card/Card.jsx';
import "./DailyForecast.modules.css";

/**
 * DailyForecast component displays 24-hour weather forecast
 * @param {Object} location - User's location data
 * @returns {JSX.Element} Forecast cards container
 */
function DailyForecast({ location }) {
    // State management
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(() => new Date()); // Lazy initial state

    // Memoized data fetching function
    const fetchData = useCallback(async () => {
        try {
            // Construct query with fallback to default location
            const query = location?.lat && location?.lon 
                ? `${location.lat},${location.lon}`
                : location?.name || 'São Paulo';
            
            const data = await getForecast(query, 2);
            setForecastData(data.forecast.forecastday);
        } catch (err) {
            setError(err.message || 'Failed to load forecast data');
        } finally {
            setLoading(false);
        }
    }, [location]);

    // Data fetching and time update effect
    useEffect(() => {
        if (location) fetchData();
        
        // Update current time every minute
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(timeInterval);
    }, [fetchData, location]);

    /**
     * Calculates 24-hour forecast starting from current hour
     * @returns {Array} Filtered and processed forecast data
     */
    const get24HourForecast = useMemo(() => {
        return () => {
            if (!forecastData) return [];
            
            const now = new Date(currentTime);
            const today = forecastData[0];
            const tomorrow = forecastData[1] || today;
            const currentFloored = new Date(now);
            currentFloored.setMinutes(0, 0, 0);

            // Find starting index for current hour
            const startIndex = today.hour.findIndex(hour => 
                new Date(hour.time) >= currentFloored
            );

            // Combine today and tomorrow's hours
            const remainingToday = startIndex >= 0 
                ? today.hour.slice(startIndex)
                : [];
            
            const neededFromTomorrow = 24 - remainingToday.length;
            const tomorrowHours = tomorrow.hour.slice(0, neededFromTomorrow);
            
            return [...remainingToday, ...tomorrowHours]
                .slice(0, 15)
                .filter((_, index) => index % 3 === 0) // 3-hour intervals
                .slice(0, 5) // Show maximum 5 items
                .map(hour => ({
                    ...hour,
                    hourDate: new Date(hour.time),
                    isCurrent: new Date(hour.time).getTime() === currentFloored.getTime(),
                    isToday: new Date(hour.time).getDate() === now.getDate()
                }));
        };
    }, [forecastData, currentTime]);

    // Loading state
    if (loading) return (
        <div className="loading">
            Loading forecast...
        </div>
    );

    // Error state
    if (error) return (
        <div className="error">
            Error: {error}
        </div>
    );

    // Main render
    return (
        <Card>
            <h2 className='DailyTitle'>Daily Forecast</h2>
            <div className="hourly-container">
                {get24HourForecast().map((hourData) => (
                    <div 
                        key={`${hourData.time}-${hourData.hourDate.getHours()}`} // Stable key
                        className="hour-card"
                    >
                        <p className="time">
                            {hourData.hourDate.toLocaleTimeString([], { 
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
                                loading="lazy" // Lazy loading optimization
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

export default React.memo(DailyForecast); // Prevent unnecessary re-renders