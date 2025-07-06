import Cloudy from "../assets/cloudy.png";
import Forecast from "../assets/forecast.png";

import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";

import CloudyGif from "../assets/cloudy.gif";
import SunnyGif from "../assets/sunny.gif";
import ThunderstromGif from "../assets/thunderstom.gif";
import RainyGif from "../assets/rainy.gif";
import WindyGif from "../assets/windy.gif";

import "./WeatherCard.css";

const WeatherCard = () => {
  return (
    <div className="weather-card">
      <img src={ThunderstromGif} alt="weather gif" className="background-gif" />
      <button className="refresh">
        <RotateCcw size={18} color="white" />
      </button>
      <div className="forecast-container">
        <img className="forecast" src={Forecast} alt="" />
      </div>
      <h1>Manila, Philippines</h1>
      <h2>Cloudy</h2>
      <img className="weather-logo" src={Cloudy} alt="" />
      <h1>78°C</h1>
      <h2>12:30 AM</h2>
      <div className="current-container">
        <div>
          <Wind size={20} />
          <h3>90</h3>
          <p>Wind_kph</p>
        </div>
        <div>
          <Droplets size={20} />
          <h3>90</h3>
          <p>Humidity</p>
        </div>
        <div>
          <Cloud size={20} />
          <h3>90</h3>
          <p>Cloud</p>
        </div>
        <div>
          <Sun size={20} />
          <h3>90C</h3>
          <p>Heatindex</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
