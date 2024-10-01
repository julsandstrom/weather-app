import React from 'react';
import UserLocation from './UserLocation';
import './SearchForm.css';

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
      <h1 className="h1-title" >
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

    
      <UserLocation setCityName={setCityName} />

     
      <div className="mt-5"> {/* Short-circuit-evaluation */}
        {favoriteCities.length > 0 && (
          <>
           
            {favoriteCities.map((city, index) => (
              <button 
                key={index} 
                className="btn btn-block btn-sm cool-link" 
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
