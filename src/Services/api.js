import axios from 'axios'; 

const API_KEY = 'a39ca72152f942299ce192024251203'; 
const BASE_URL = 'http://api.weatherapi.com/v1'; 

export const getCurrentWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location,
        lang: 'en',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (location, days = 8) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location, 
        days: days,
        lang: 'en',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};