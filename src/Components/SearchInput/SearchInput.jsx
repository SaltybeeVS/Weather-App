import React, { useState, useEffect } from 'react';
import { searchCities } from '../../Services/api.js';
import './SearchInput.modules.css';

/**
 * SearchInput component with autocomplete functionality
 * @param {Function} onCitySelect - Callback for selected city
 * @returns {JSX.Element} Search input with suggestions
 */
const SearchInput = ({ onCitySelect }) => {
  // Component state management
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call with debounce mechanism
  useEffect(() => {
    const fetchCities = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchCities(query);
        setSuggestions(data);
      } catch (err) {
        setError('Error searching cities');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce implementation (300ms delay)
    const debounceTimer = setTimeout(fetchCities, 300);
    
    // Cleanup timer on unmount/re-render
    return () => clearTimeout(debounceTimer);
  }, [query]);

  /**
   * Handles city selection from suggestions
   * @param {Object} city - Selected city object
   */
  const handleSelect = (city) => {
    setQuery(city.name); // Display original city name
    setSuggestions([]); // Clear suggestions
    onCitySelect({
        name: city.name,
        lat: city.lat,
        lon: city.lon
    });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="search-input"
      />
      
      {/* Loading state indicator */}
      {isLoading && <div className="loading">Searching...</div>}
      
      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Suggestions list */}
      {!isLoading && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              {city.name}, {city.region}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;