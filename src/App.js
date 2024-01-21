import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    setError(null);

    const weatherApiKey = "22f2cb810350606a89436fea13da3c79"; // Use environment variable for API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

    try {
      const weatherResponse = await fetch(weatherUrl);
      const data = await weatherResponse.json();

      if (weatherResponse.ok) {
        setWeatherData(data);
      } else {
        setError("Error fetching weather data.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    const geocodingApiKey = "bddf1223b9b84137a1ff12661a6d234e"; // Use environment variable for API key
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${geocodingApiKey}`;

    try {
      const geocodingResponse = await fetch(geocodeUrl);
      const geocodingData = await geocodingResponse.json();

      if (!geocodingResponse.ok || geocodingData.results.length === 0) {
        setError("Error fetching location data.");
        return;
      }

      const { lat, lng } = geocodingData.results[0].geometry;
      console.log({ lat: lat, lng: lng });
      fetchWeatherData(lat, lng);
    } catch (error) {
      setError("Network error.");
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              weatherData={weatherData}
              onSearch={fetchWeatherByCity}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
