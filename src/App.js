import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have the CSS file for styling

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetching data from the API on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Filter countries based on the search query
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Countries display */}
      <div className="countries-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="flag"
              />
              <p>{country.name.common}</p>
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