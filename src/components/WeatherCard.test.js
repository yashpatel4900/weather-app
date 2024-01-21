import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherCard from "./WeatherCard";


describe("WeatherCard", () => {
  it("renders weather data correctly", () => {
    // Mock weather data
    const mockWeatherData = {
      name: "Syracuse",
      weather: [{ main: "Snow", description: "light snow" }],
      main: {
        temp: 263.05,
        feels_like: 258.07,
        temp_min: 261.9,
        temp_max: 264.03,
        humidity: 87,
      },
      wind: { speed: 2.57 },
      dt: 1705798168,
    };

    render(<WeatherCard weatherData={mockWeatherData} />);

    // Check if the component renders the city name
    expect(screen.getByText("Syracuse")).toBeInTheDocument();

    // Check for weather condition
    expect(screen.getByText(/snow/i)).toBeInTheDocument();

    // Add more assertions as needed...
  });
});
