import React from "react";

function WeatherCard({ weather }) {
  return (
    <section
      aria-live="polite"
      style={{
        border: "1px solid gray",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
        maxWidth: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>Temperature: {Math.round(weather.main.temp - 273.15, 2)} °C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Weather: {weather.weather[0].description}</p>
    </section>
  );
}
export default WeatherCard;
