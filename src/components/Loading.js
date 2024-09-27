function Loading() {
    return <p>Loading weather data...</p>;
  }
  
  function ErrorMessage({ error }) {
    return <p>{error}</p>;
  }

  export { Loading, ErrorMessage };