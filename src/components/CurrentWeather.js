import React, { useState, useEffect } from 'react';
import WeatherHeader from './WeatherHeader';
import WeatherDetails from './WeatherDetails';
import { Loading, ErrorMessage } from './Loading';

function CurrentWeather({ cityName, showNextFiveDays }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const getCoordinates = async (cityName) => {
      const geocodingResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=7d9c11b0fb374eec943a52f31a874afb`
      );
      const geocodingData = await geocodingResponse.json();

    
      if (geocodingData.results && geocodingData.results.length > 0) {
        const { lat, lng } = geocodingData.results[0].geometry;
        return { lat, lng };
      } else {
        throw new Error('Location not found');
      }
    };

    const fetchWeather = async (days = 1) => {
      try {
        setLoading(true);
        const { lat, lng } = await getCoordinates(cityName);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=${days}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setCurrentWeather(data.current_weather);
        setDailyWeather(data.daily); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   
    fetchWeather(showNextFiveDays ? 5 : 1);
  }, [cityName, showNextFiveDays]);

  const formatDate = (daysAhead) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead); 
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!currentWeather) return <p>No weather data available</p>;

  return (
    <div>
      {showNextFiveDays ? (
        <div className="forecast-container">
  <h2 className="h3 font-weight-normal" style={{ 
    fontSize: '1.5rem',
    fontWeight: 'bold', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    color: '#333', 
    marginBottom: '15px', 
    textAlign: 'center'
  }}>{cityName} |<small> Next 5 Days</small></h2>
  
  <ul className="forecast-list" style={{
    width: '500px',
    textAlign: "center",
    border: '2px solid #ccc',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    marginLeft: '30px',
    paddingLeft: '10px',
    paddingRight: '10px',
  }}>
    {dailyWeather.temperature_2m_max.map((maxTemp, index) => (
      <li key={index} className="forecast-item" style={{
        marginBottom: '0px',
        marginTop: '5px',
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr 1fr', 
        gap: '0px', 
        alignItems: 'center', 
        padding: '10px', 
        borderBottom: '1px solid #ddd', 
        width: '100%', 
      }}>
        <span>{formatDate(index)}:</span> 
        <span style={{ color: 'red' }}>Low {dailyWeather.temperature_2m_min[index]}°C</span> 
        <span style={{ color: 'green' }}>High {maxTemp}°C</span> 
        <WeatherDetails weatherCode={dailyWeather.weathercode[index]} />
      </li>
    ))}
  </ul>
</div>
      ) : (
        <>
          <WeatherHeader cityName={cityName} />
          <WeatherDetails dailyWeather={dailyWeather} currentWeather={currentWeather} />
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
