import axios from 'axios';

// API configuration constants
const BASE_URL = 'https://api.weatherapi.com/v1'; // Changed to HTTPS for secure connection
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;// Use environment variables for security

// Create reusable axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    lang: 'en',
  },
});

/**
 * Fetches current weather data for a specific location
 * @param {string} location - Location query (city name, coordinates, etc.)
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (location) => {
  try {
    const { data } = await axiosInstance.get('/current.json', {
      params: { q: location }
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch current weather:', error.response?.data || error.message);
    throw new Error('Failed to retrieve weather data');
  }
};

/**
 * Fetches weather forecast for a specific location
 * @param {string} location - Location query
 * @param {number} [days=8] - Number of forecast days (max 14)
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (location, days = 8) => {
  try {
    const { data } = await axiosInstance.get('/forecast.json', {
      params: { q: location, days }
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch forecast:', error.response?.data || error.message);
    throw new Error('Failed to retrieve forecast data');
  }
};

/**
 * Searches for cities based on a query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cities
 */
export const searchCities = async (query) => {
  try {
    const { data } = await axiosInstance.get('/search.json', {
      params: { q: query }
    });
    return data;
  } catch (error) {
    console.error('City search failed:', error.response?.data || error.message);
    throw new Error('Failed to search cities');
  }
};