import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false); 
      }
    };
    fetchCountries();
  }, []);


  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

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
              <p className="countryName">{country.name.common}</p>
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
