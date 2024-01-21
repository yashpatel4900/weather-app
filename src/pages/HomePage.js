import React from "react";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

function HomePage({
  weatherData,
  pinnedWeatherData,
  onSearch,
  loading,
  error,
}) {
  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={onSearch} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}

      {/* Section for Pinned Location Weather Cards */}
      <div>
        <h2 className="text-xl font-bold mt-8 mb-4">Pinned Locations</h2>
        {pinnedWeatherData.map((data, index) => (
          <WeatherCard key={index} weatherData={data} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
