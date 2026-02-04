import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import WeatherCard from "./components/WeatherCard";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  // const [isDarkMode, setIsDarkMode] = useState(true);

  const getTemperaturePrediction = async (data) => {
    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        humidity: data.main.humidity,
        visibility: data.visibility / 1000,
      }),
    });
    const predictedData = await response.json();
    console.log(predictedData.predicted_temperature);
  };
  // gets weather data for the city entered from Open Weather Map API
  const getWeather = async () => {
    const API_key = import.meta.env.VITE_WEATHER_API_KEY;
    const weatherAPI_endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    try {
      const response = await fetch(weatherAPI_endPoint);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        // call predictTemperature using ML model
        getTemperaturePrediction(data);
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
    <div
      className={
        "flex flex-col items-center justify-center p-4  gap-6 min-h-screen w-full"
      }
    >
      <header>
        {/* <button
          className="toggle-btn ml-0 mb-4 px-4 py-2 bg-(--color-accent) rounded-lg text-white hover:bg-[#6b6899] transition-colors shadow-md"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </button> */}
      </header>
      <main>
        <div className="weather-app flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-center font-extrabold text-(--color-accent) tracking-tight leading-tight">
            <span className="hidden sm:inline">Accessible </span>
            Weather Dashboard
          </h1>
          <label
            htmlFor="city-name"
            id="city-label"
            className="text-[#7f7cae] font-bold text-sm uppercase tracking-wider"
          >
            Enter your City
          </label>
          <input
            id="city-name"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-white border-2 rounded-lg border-[#7f7cae] focus:outline-none focus-ring-2 focus:ring-[#7f7cae] px-4 py-2 w-64 text-center text-gray-800 transition-all"
          />
          <button
            onClick={getWeather}
            className="weather-btn px-4 py-2 bg-(--color-accent) rounded-lg text-white hover:bg-[#6b6899] transition-colors shadow-md"
          >
            Get Weather
          </button>
          {/* donot display weather component if weather data is falsy */}
          {weather && <WeatherCard weather={weather} />}
        </div>
      </main>
    </div>
  );
}

export default App;
