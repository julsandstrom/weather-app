import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import WeatherDisplay from "./WeatherDisplay";
import icon from './icon.png';

function BootstrapLayout() {
  // State to track if weather information should be shown
  const [showWeather, setShowWeather] = useState(false);

  // State to store the city name input by the user
  const [cityName, setCityName] = useState('');

  // State to remember if the user has opted to save their city name
  const [rememberCity, setRememberCity] = useState(false);

  // State to store favorite cities (max 2)
  const [favoriteCities, setFavoriteCities] = useState([]);

  // useEffect hook runs once when the component mounts
  // It checks if a city was remembered in localStorage and loads favorite cities
  useEffect(() => {
    const savedCity = localStorage.getItem("rememberedCity");
    if (savedCity) {
      setCityName(savedCity);
      setRememberCity(true);
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavoriteCities(storedFavorites.slice(0, 2)); // Load favorite cities (limit to 2)
  }, []); // Empty array means this effect runs only once after the initial render

  // Updated handleSubmit function to prevent duplicate cities
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Store or remove the city name in localStorage based on the checkbox status
    if (rememberCity) {
      localStorage.setItem('rememberedCity', cityName);
    } else {
      localStorage.removeItem('rememberedCity');
    }

    // Add city to favorites if checked and not already in the list
    if (rememberCity && cityName) {
      let updatedFavorites = [...favoriteCities];

      // Check if the city is already in the list before adding
      if (!updatedFavorites.includes(cityName)) {
        // If 2 cities are already stored, remove the first (oldest)
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

  // Function to handle new search and reset the form
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
