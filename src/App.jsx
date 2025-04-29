import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  // gets weather data for the city entered from Open Weather Map API
  const getWeather = async () => {
    const API_key = "9cf940e3508a191d222d41ee90cb7a8f";
    const weatherAPI_endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    try {
      const response = await fetch(weatherAPI_endPoint);
      const data = await response.json();
      console.log("Weather data", data);
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error in fetching weather data: ", error);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div>
      <h1>Accessible Weather Dashboard</h1>
      <label htmlFor="city-name">Enter your city: </label>
      <input
        id="city-name"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={getWeather}>Get Weather</button>
      {/* donot display weather component if weather data is falsy */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
