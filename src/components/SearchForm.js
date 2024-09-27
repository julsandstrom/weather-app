import React from 'react';
import UserLocation from './UserLocation';

function SearchForm({ cityName, setCityName, rememberCity, setRememberCity, handleSubmit, favoriteCities }) {

  // Function to capitalize each word in the city name
  const capitalizeCityName = (name) => {
    return name
      .split(' ') // Split the name into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back together
  };

  // Function to handle clicking on a favorite city
  const handleSelectFavoriteCity = (city) => {
    setCityName(city);
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 font-weight-normal" style={{
        fontSize: '2rem',
        fontWeight: 'bold', 
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        color: '#333', 
        marginBottom: '30px' 
      }}>
        Global Window
      </h1>

      <label htmlFor="cityName" className="sr-only mb-2">Search</label>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          id="cityName"
          className="form-control mb-4 w-50"
          placeholder="City Name"
          required
          value={cityName}
          onChange={(e) => setCityName(capitalizeCityName(e.target.value))}
        />
      </div>
      
      <div className="checkbox mb-3">
        <label>
          <input 
            type="checkbox"
            checked={rememberCity}
            onChange={(e) => setRememberCity(e.target.checked)}
          /> <small>Remember my city</small>
        </label>
      </div>

      <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: '20px' }}>Search</button>

      {/* Use My Location button */}
      <UserLocation setCityName={setCityName} />

      {/* Display favorite cities below the search button */}
      <div className="mt-5">
        {favoriteCities.length > 0 && (
          <>
           
            {favoriteCities.map((city, index) => (
              <button 
                key={index} 
                className="btn btn-block btn-sm cool-link" // Applying the same button styles
                onClick={() => handleSelectFavoriteCity(city)}
                style={{ marginBottom: '10px', marginRight:'5px' }}
              >
                {city}
              </button>
            ))}
          </>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
