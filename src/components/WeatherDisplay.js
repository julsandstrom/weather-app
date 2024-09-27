import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather';

function WeatherDisplay({ cityName, newSearch }) {
  const [showNextFiveDays, setShowNextFiveDays] = useState(false);

  const toggleNextFiveDays = () => {
    setShowNextFiveDays(!showNextFiveDays);
  };

  return (
    <div>
      {/* Pass the state down to CurrentWeather */}
      <CurrentWeather cityName={cityName} showNextFiveDays={showNextFiveDays} />
      <button className="btn btn-primary btn-sm" onClick={newSearch} style={{ marginRight: '30px' }}>
        New Search
      </button>
      <button className="btn btn-primary btn-sm" onClick={toggleNextFiveDays}>
        {showNextFiveDays ? 'Show Current Weather' : 'Next 5 Days'}
      </button>
    </div>
  );
}

export default WeatherDisplay;
