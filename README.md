# WeatherSphere - Modern Weather Dashboard

A feature-rich weather application with real-time forecasts, animated backgrounds, and intuitive UI components.

## Features

- **Real-time Weather Data**
  - Current temperature & conditions
  - Hourly and daily precipitation chances
  - "Feels Like" temperature
  - Wind speed and direction

- **Advanced Forecasts**
  - 24-hour detailed forecast
  - 7-day extended outlook
  - Temperature range visualization
  - Weather condition icons

- **Interactive UI**
  - Geolocation support
  - City search with autocomplete
  - Responsive grid layout
  - Animated cyberpunk-style background
  - Permission management system

- **Technical Highlights**
  - API request caching
  - Error boundaries and loading states
  - Accessibility-first components
  - Responsive design
  - Performance optimizations

## Technologies Used

![Tech Stack](https://skillicons.dev/icons?i=react,js,html,css,webpack,git)

- **Core**
  - React 18+ (Hooks API)
  - Modern CSS (Flexbox/Grid)
  - CSS Modules
  - Webpack 5

- **APIs & Services**
  - [WeatherAPI.com](https://www.weatherapi.com/) (Primary data source)
  - Browser Geolocation API

- **Libraries**
  - Axios (HTTP client)
  - React Icons (Fa6)
  - Date-fns (Date formatting)

- **Optimizations**
  - Request debouncing
  - API call cancellation
  - React.memo() usage
  - Lazy image loading

## Installation

1. **Prerequisites**
   - Node.js v16+
   - npm v8+
   - WeatherAPI.com account (Free tier)

2. **Local Setup**
   ```bash
   git clone https://github.com/SaltybeeVS/weather-app.git
   cd weather-app
   npm install
   ```

3. **Configuration**
   Create `.env` file in root directory:
   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. **Running**
   ```bash
   npm start
   ```

## Project Structure

```bash
src/
├── Components/
│   ├── Common/          # Reusable components
│   ├── DailyForecast/   # 24-hour forecast module
│   ├── SearchInput/     # City search with autocomplete
│   ├── SideBar/         # Social/Info panel
│   ├── WeatherInfo/     # Current weather display
│   └── WeeklyForecast/  # 7-day forecast module
│
├── Services/
│   └── api.js           # API service layer
│
├── App.js               # Root component
└── index.js             # Entry point
```

## Key Implementation Details

### API Service Layer (`api.js`)
- Centralized API configuration
- Error handling wrapper
- Parameter validation
- Response transformation

```javascript
// Example API call structure
const axiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lang: 'en',
  },
  timeout: 5000
});
```

### Performance Features
- **Request Debouncing:** 300ms delay on search input
- **Memoization:** React.memo and useCallback usage
- **Cancellation:** AbortController for in-flight requests
- **Lazy Loading:** Images load on scroll into view

### Security
- API key protection via environment variables
- HTTPS enforced for all requests
- Input sanitization for search queries
- Error boundaries for component failures

## License

MIT License - See [LICENSE](LICENSE) for details

---

**Potential Improvements Roadmap**
- Add air quality index display
- Implement weather alerts system
- Create theme switching (light/dark mode)
- Add measurement unit toggles (°C/°F, km/h/mph)
- Implement PWA features
- Add internationalization support

**Credits**
- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- UI icons from [React Icons](https://react-icons.github.io/react-icons)

- [Versión en Español](README.es.md)
- [Versão em Português](README.pt.md)