import React from "react";

function WeatherCard({ weatherData }) {
  // Check if weatherData is available
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  // Helper function to convert Kelvin to Celsius
  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  // Extracting data from weatherData object
  const {
    name,
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    visibility,
    dt,
    snow,
  } = weatherData;

  return (
    <div className="max-w-md mx-auto my-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm">{new Date(dt * 1000).toLocaleDateString()}</p>

        <div className="mt-3">
          <p className="text-xl font-semibold">
            {weather[0].main} ({weather[0].description})
          </p>
          <p className="text-lg">Temperature: {toCelsius(temp)}°C</p>
          <p className="text-lg">Feels Like: {toCelsius(feels_like)}°C</p>
          <p>
            Min Temp: {toCelsius(temp_min)}°C, Max Temp: {toCelsius(temp_max)}°C
          </p>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {speed} m/s</p>
          <p>Visibility: {visibility / 1000} km</p>
          {snow && snow["1h"] && <p>Snowfall: {snow["1h"]} mm/h</p>}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
