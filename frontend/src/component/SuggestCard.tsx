import "./SuggestCard.css";

import Gemini from "../assets/gemini.png";
import GeminiIcon from "../assets/geministart.png";
import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";

const SuggestCard = () => {
  return (
    <div className="suggest-card">
      <button className="refresh">
        <RotateCcw size={18} color="white" />
      </button>
      <img src={Gemini} alt="" width={90} />
      <div className="suggestion-title">
        <h4>Outfit Suggestion by Gemini:</h4>
      </div>
      <div className="suggestion-box">
        <ul>
          <li>Rain boots, leggings, oversized sweater, rain jacket.</li>
          <li>Waterproof sneakers, jeans, t-shirt, hoodie, trench coat.</li>
          <li>
            Chelsea boots, dress pants, button-down shirt, light raincoat.
          </li>
          <li>Loafers, midi skirt, turtleneck, cardigan, umbrella.</li>
          <li>
            Ankle boots, corduroy pants, long-sleeved shirt, puffer vest, hat.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SuggestCard;
