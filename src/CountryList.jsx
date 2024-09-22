import React, { useState, useEffect } from 'react';
import './CountryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://xcountries-backend.azurewebsites.net/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="country-list-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="country-list">
        {filteredCountries.map((country) => (
          <div key={country.name} className="country-item">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="country-flag"
            />
            <p className="country-name">{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
