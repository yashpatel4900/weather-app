import React from "react";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

function HomePage({ weatherData, onSearch, loading, error }) {
  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={onSearch} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default HomePage;
