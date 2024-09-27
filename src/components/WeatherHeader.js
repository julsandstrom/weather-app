function WeatherHeader({ cityName, date }) {
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  return (
    <div>
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          color: '#333',
        }}
      >
        {cityName}
      </h2>
      <h6 style={{ marginBottom: '30px' }}>
        {date ? date : getCurrentDate()}
      </h6> {/* Use the passed date or default to the current date */}
    </div>
  );
}

export default WeatherHeader;
