import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries on initial render
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries. Please try again later.');
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Debounce search query to avoid re-renders
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Filter countries based on debounced search query
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="countries-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <div className="cardContent">
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="flag"
                />
                <h2>{country.name.common}</h2>
                <p>Region: {country.region}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
