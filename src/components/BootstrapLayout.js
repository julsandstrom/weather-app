import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import WeatherDisplay from "./WeatherDisplay";
import icon from './icon.png';

function BootstrapLayout() {
  const [showWeather, setShowWeather] = useState(false);
  const [cityName, setCityName] = useState('');
  const [rememberCity, setRememberCity] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const savedCity = localStorage.getItem("rememberedCity");
    if (savedCity) {
      setCityName(savedCity);
      setRememberCity(true);
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedFavorites.slice(0, 2)); //updates the state, new array with only 2 cities to setFavoriteCities
  }, []); 

 
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (rememberCity) {
      localStorage.setItem('rememberedCity', cityName);
    } else {
      localStorage.removeItem('rememberedCity');
    }

    
    if (rememberCity && cityName) {
      let updatedFavorites = [...favoriteCities];

      if (!updatedFavorites.includes(cityName)) {
        if (updatedFavorites.length >= 2) {
          updatedFavorites.shift();
        }

        updatedFavorites.push(cityName);

        setFavoriteCities(updatedFavorites); // Update state
        localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites)); // Save to localStorage
      }
    }

    setShowWeather(true);
  };

  // New search and reset the form
  const newSearch = () => {
    setShowWeather(false); 
    if (!rememberCity) {
      setCityName(''); // Clear the city name if the user doesn't want it remembered
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center border rounded shadow p-4 bg-white" style={{ width: '620px', height: '500px' }}>
        <img className="mt-4 mb-4" src={icon} alt="" width="130" height="80" />

        {/* Conditionally render either the WeatherDisplay or the SearchForm */}
        {showWeather ? (
          // Display the weather info after the form is submitted
          <WeatherDisplay cityName={cityName} newSearch={newSearch} />
        ) : (
          // Show the search form to input the city name
          <SearchForm 
            cityName={cityName}
            setCityName={setCityName}
            rememberCity={rememberCity}
            setRememberCity={setRememberCity}
            handleSubmit={handleSubmit}
            favoriteCities={favoriteCities} // Passing favorite cities to SearchForm
          />
        )}
        <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', textAlign: 'center', color:'grey' }}>
          <small>Weather App - Julian Sandström</small>
        </div>
      </div>
    </div>
  );
}

export default BootstrapLayout;