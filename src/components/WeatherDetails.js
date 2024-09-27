function WeatherDetails({ dailyWeather, currentWeather, weatherCode }) {
  const getWeatherCondition = (weatherCode) => {
    if (weatherCode === 0) return "Clear Sky ☀️";
    if (weatherCode >= 1 && weatherCode <= 3) return "Partly Cloudy 🌤";
    if (weatherCode >= 45 && weatherCode <= 48) return "Fog ☁️";
    if (weatherCode >= 51 && weatherCode <= 57) return "Drizzle 🌦";
    if (weatherCode >= 61 && weatherCode <= 67) return "Rain 🌧";
    if (weatherCode >= 71 && weatherCode <= 77) return "Snow 🌨";
    if (weatherCode >= 80 && weatherCode <= 82) return "Rain Showers 🌦";
    if (weatherCode >= 85 && weatherCode <= 86) return "Snow Showers 🌨";
    return "Unknown Weather";
  };

  // Use weatherCode if passed from CurrentWeather for the next 5 days
  if (weatherCode !== undefined) {
    return <span>{getWeatherCondition(weatherCode)}</span>;
  }

  return (
    <div
      style={{
        width: '330px',
        textAlign: "center",
        border: '2px solid #ccc',
        paddingTop: '12px',
        boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        marginBottom: '20px',
        marginLeft: '120px'
      }}
    >
      <p>
        <span style={{ color: 'red' }}>Low: {dailyWeather.temperature_2m_min[0]} °C</span> |
        <span style={{ color: 'green' }}> High: {dailyWeather.temperature_2m_max[0]} °C</span>
      </p>
      <p>{getWeatherCondition(currentWeather.weathercode)} | Wind: {currentWeather.windspeed} m/s</p>
      <p>Current Temperature: {currentWeather.temperature}°C</p>
    </div>
  );
}

export default WeatherDetails;
