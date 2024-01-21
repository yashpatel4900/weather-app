import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { auth, firestore } from "./firebase/firebase.js";
import { signInWithGoogle } from "./firebase/authService.js";
import { AuthProvider } from "./context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [pinnedWeatherData, setPinnedWeatherData] = useState([]);

  const fetchPinnedLocationsWeather = async (pinnedLocations) => {
    const weatherApiKey = "22f2cb810350606a89436fea13da3c79"; // Use environment variable for API key
    const weatherDataPromises = pinnedLocations.map(async (location) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}`
      );
      return response.json();
    });

    const weatherDataArray = await Promise.all(weatherDataPromises);
    setPinnedWeatherData(weatherDataArray);
  };

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

  // Use geolocation to fetch weather data on load
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

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists() && docSnap.data().pinnedLocations) {
            fetchPinnedLocationsWeather(docSnap.data().pinnedLocations);
          }
        });
      } else {
        setPinnedWeatherData([]); // Clear pinned data if user signs out
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <AuthProvider>
      <Router>
        <NavBar currentUser={currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <HomePage
                  weatherData={weatherData}
                  pinnedWeatherData={pinnedWeatherData}
                  onSearch={fetchWeatherByCity}
                  loading={loading}
                  error={error}
                />
              ) : (
                <div>
                  <p>Please sign in to view the weather information.</p>
                  <button onClick={signInWithGoogle}>
                    Sign In with Google
                  </button>
                </div>
              )
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
