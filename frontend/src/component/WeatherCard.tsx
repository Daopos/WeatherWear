import Cloudy from "../assets/cloudy.png";
import Forecast from "../assets/forecast.png";

import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";

const WeatherCard = () => {
  return (
    <div className="weather-card">
      <button className="refresh">
        <RotateCcw size={20} />
      </button>
      <div className="forecast-container">
        <img className="forecast" src={Forecast} alt="" />
      </div>
      <h1>Manila, Philippines</h1>
      <h2>Cloudy</h2>
      <img src={Cloudy} alt="" />
      <h1>78°C</h1>
      <h2>12:30 AM</h2>
      <div className="current-container">
        <div>
          <Wind size={20} />
          <h3>90</h3>
          <p>wind_kph</p>
        </div>
        <div>
          <Droplets size={20} />
          <h3>90</h3>
          <p>humidity</p>
        </div>
        <div>
          <Cloud size={20} />
          <h3>90</h3>
          <p>cloud</p>
        </div>
        <div>
          <Sun size={20} />
          <h3>90C</h3>
          <p>heatindex_c</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
