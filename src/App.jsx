import React, { useState, useEffect, useCallback } from 'react';
import SideBar from './Components/SideBar/SideBar';
import WeeklyForecast from './Components/WeeklyForecast/WeeklyForecast';
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import DailyForecast from './Components/DailyForecast/DailyForecast';
import Background from './Components/Common/AnimatedBackground/Background';
import SearchInput from './Components/SearchInput/SearchInput';

// Permission state constants for better maintainability
const PERMISSION_STATES = {
  PROMPT: 'prompt',
  GRANTED: 'granted',
  DENIED: 'denied'
};

/**
 * Main application component handling layout and geolocation
 * @returns {JSX.Element} The root application component
 */
function App() {
  // State management
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(PERMISSION_STATES.PROMPT);

  // Geolocation effect with proper cleanup
  useEffect(() => {
    let isMounted = true;
    
    const handleGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isMounted) {
              setSelectedLocation({
                name: 'Your current location',
                lat: position.coords.latitude,
                lon: position.coords.longitude
              });
              setLocationPermission(PERMISSION_STATES.GRANTED);
            }
          },
          (error) => {
            if (isMounted) {
              console.error('Location access error:', error);
              setLocationPermission(PERMISSION_STATES.DENIED);
            }
          }
        );
      }
    };

    handleGeolocation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoized location handler
  const handleCitySelect = useCallback((city) => {
    setSelectedLocation({
      name: city.name,
      lat: city.lat,
      lon: city.lon
    });
  }, []);

  // Geolocation request with error handling
  const requestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedLocation({
          name: 'Your current location',
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationPermission(PERMISSION_STATES.GRANTED);
      },
      (error) => {
        console.error('Location request failed:', error);
        setLocationPermission(PERMISSION_STATES.DENIED);
      }
    );
  }, []);

  // Permission modal component
  const renderPermissionModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="permission-modal-title"
    >
      <div className="bg-gray-800 p-8 rounded-2xl text-center max-w-md mx-4">
        <h2 id="permission-modal-title" className="text-2xl text-white mb-4">
          Location Access Required
        </h2>
        <p className="text-gray-300 mb-6">
          To provide accurate local weather information, we need your location permission.
        </p>
        <button
          onClick={requestLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all"
          aria-label="Grant location access"
        >
          Allow Location Access
        </button>
        <p className="text-gray-400 mt-4 text-sm">
          You can modify this permission later in your browser settings
        </p>
      </div>
    </div>
  );

  // Main layout structure
  return (
    <>
      <Background />
      
      {locationPermission !== PERMISSION_STATES.GRANTED && renderPermissionModal()}

      <div className="grid grid-cols-[7rem_1fr_500px] grid-rows-[auto_1fr_auto] h-screen min-w-[calc(7rem+500px+100px)] gap-x-4 gap-y-4">
        {/* Left sidebar */}
        <div className="row-span-2 min-w-[7rem] pr-2">
          <SideBar />
        </div>

        {/* Search input */}
        <div className="col-start-2 row-start-1 p-4 pb-0">
          <SearchInput onCitySelect={handleCitySelect} />
        </div>

        {/* Main weather info */}
        <div className="col-start-2 row-start-2 p-4 overflow-y-auto">
          <WeatherInfo location={selectedLocation} />
        </div>

        {/* Daily forecast */}
        <div className="col-start-2 row-start-3 pt-0">
          <DailyForecast location={selectedLocation} />
        </div>

        {/* Weekly forecast sidebar */}
        <div className="col-start-3 row-span-3 p-4 overflow-y-auto min-w-[500px] pl-4">
          <WeeklyForecast location={selectedLocation || "São Paulo"} />
        </div>
      </div>
    </>
  );
}

export default React.memo(App);