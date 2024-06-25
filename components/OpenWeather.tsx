import React, { useEffect, useState } from "react";
import { WeatherData } from "../types/weather";

const OpenWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("BukitMertajam"); // You can change this to any location you want

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?location=${location}`);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data: WeatherData = await res.json();
        console.log("Fetched Weather Data:", data); // Log fetched weather data
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error); // Log any errors
      }
    };

    fetchWeather();
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather in {weatherData.location.name}</h1>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
    </div>
  );
};

export default OpenWeather;
