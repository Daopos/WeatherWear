import { useEffect, useState, type CSSProperties } from "react";

import Cloudy from "../assets/cloudy.png";
import Moon from "../assets/moon.png";
import Suns from "../assets/sun.png";
import Rainy from "../assets/rainy.png";
import Thunderstorm from "../assets/thunderstorm.png";
import Windy from "../assets/windy.png";

import CloudyGif from "../assets/cloudy.gif";
import SunnyGif from "../assets/sunny.gif";
import ThunderstromGif from "../assets/thunderstom.gif";
import RainyGif from "../assets/rainy.gif";
import WindyGif from "../assets/windy.gif";

import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";
import Forecast from "../assets/forecast.png";

import "./WeatherCard.css";
import { getWeather, type WeatherData } from "../services/service";
import { BarLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const getWeatherAssets = (code: number, isDay: number, windKph: number) => {
  if (windKph >= 30) {
    return { icon: Windy, gif: WindyGif };
  }

  switch (code) {
    case 1000: // Clear
      return { icon: isDay ? Suns : Moon, gif: SunnyGif };
    case 1003: // Partly cloudy
    case 1006: // Cloudy
    case 1009: // Overcast
      return { icon: Cloudy, gif: CloudyGif };
    case 1063: // Patchy rain
    case 1150: // Light drizzle
    case 1183: // Light rain
    case 1186: // Moderate rain
    case 1192: // Heavy rain
    case 1195: // Torrential rain
      return { icon: Rainy, gif: RainyGif };
    case 1087: // Thunder
    case 1273:
    case 1276:
    case 1279:
    case 1282:
      return { icon: Thunderstorm, gif: ThunderstromGif };
    default:
      return { icon: Suns, gif: CloudyGif }; // fallback
  }
};

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async (): Promise<void> => {
    setIsLoading(true);

    await getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = (): void => {
    getWeatherData();
  };

  const assets = weatherData
    ? getWeatherAssets(
        weatherData.current.condition.code,
        weatherData.current.is_day,
        weatherData.current.wind_kph
      )
    : { icon: Suns, gif: CloudyGif };

  return (
    <div className="weather-card">
      {/* Always show the refresh button */}
      <button className="refresh" onClick={handleReset}>
        <RotateCcw size={18} color="white" />
      </button>

      {isLoading ? (
        // Show only loader
        <div
          style={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarLoader
            color={"#4285F4"}
            loading={isLoading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {/* Background GIF only when not loading */}
          <img src={assets.gif} alt="weather gif" className="background-gif" />

          <div className="forecast-container">
            <img className="forecast" src={Forecast} alt="" />
          </div>

          <h1>{`${weatherData?.location.name}, ${weatherData?.location.country}`}</h1>
          <h2>{weatherData?.current.condition.text}</h2>
          <img className="weather-logo" src={assets.icon} alt="weather icon" />
          <h1>{weatherData?.current.temp_c}°C</h1>
          <h2>{weatherData?.location.localtime.split(" ")[1]}</h2>

          <div className="current-container">
            <div>
              <Wind size={20} />
              <h3>{weatherData?.current.wind_kph}</h3>
              <p>Wind_kph</p>
            </div>
            <div>
              <Droplets size={20} />
              <h3>{weatherData?.current.humidity}</h3>
              <p>Humidity</p>
            </div>
            <div>
              <Cloud size={20} />
              <h3>{weatherData?.current.cloud}</h3>
              <p>Cloud</p>
            </div>
            <div>
              <Sun size={20} />
              <h3>{weatherData?.current.heatindex_c}°C</h3>
              <p>Heatindex</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
