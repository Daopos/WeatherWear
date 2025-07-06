import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WeatherCard from "./component/WeatherCard";
import SuggestCard from "./component/SuggestCard";

function App() {
  return (
    <>
      <div className="container">
        <WeatherCard />
        <SuggestCard />
      </div>
    </>
  );
}

export default App;
