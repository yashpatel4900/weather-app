import React from "react";
import { firestore } from "../firebase/firebase"; // Adjust path as necessary
import { useAuth } from "../context/AuthContext";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

function WeatherCard({ weatherData }) {
  const { currentUser } = useAuth();

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  // Convert temperature from Kelvin to Celsius
  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  // Extract data with optional chaining to safely access nested properties
  const {
    name,
    coord: { lat, lon } = {},
    main: { temp, feels_like, temp_min, temp_max, humidity } = {},
    wind: { speed } = {},
    visibility,
    dt,
    snow,
    weather = [],
  } = weatherData;

  const handlePinLocation = async () => {
    if (!currentUser || !lat || !lon) return;

    const userDocRef = doc(firestore, "users", currentUser.uid);
    const locationData = {
      name,
      latitude: lat,
      longitude: lon,
    };

    try {
      // Get the user document
      const docSnap = await getDoc(userDocRef);

      // If the document exists, update it. Otherwise, create it.
      if (docSnap.exists()) {
        await updateDoc(userDocRef, {
          pinnedLocations: arrayUnion(locationData),
        });
      } else {
        await setDoc(
          userDocRef,
          {
            pinnedLocations: [locationData],
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error pinning location:", error);
    }
  };

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
          <button
            onClick={handlePinLocation}
            className="mt-4 bg-white text-blue-500 px-4 py-2 rounded shadow"
          >
            Pin Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
