import React from 'react';

function UserLocation({ setCityName }) {
  const handleUseMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
         
          const geocodingResponse = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7d9c11b0fb374eec943a52f31a874afb`
          );
          const geocodingData = await geocodingResponse.json();

          if (geocodingData.results && geocodingData.results.length > 0) {
            const components = geocodingData.results[0].components;
            const city = components.city || components.town || components.village || components.county;

            if (city) {
              setCityName(city);
            } else {
              alert('City, town, village, or county not found in the geocoding response');
            }
          } else {
            alert('Unable to fetch location data');
          }
        } catch (error) {
          console.error('Error fetching city name:', error);
          alert('Error fetching city name');
        }
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <button 
      className="btn btn-primary btn-block" 
      type="button"
      style={{ marginTop: '20px', marginLeft: '10px'}}
      onClick={handleUseMyLocation}
    >
      Use My Location
    </button>
  );
}

export default UserLocation;
