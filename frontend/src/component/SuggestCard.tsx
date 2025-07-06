import "./SuggestCard.css";

import Gemini from "../assets/gemini.png";
import GeminiIcon from "../assets/geministart.png";
import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getSuggestion } from "../services/service";

const SuggestCard = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getData();
      hasFetched.current = true;
    }
  }, []);

  const getData = async () => {
    setIsLoading(true);

    await getSuggestion()
      .then((data) => {
        setSuggestions(data.result);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="suggest-card">
      <button className="refresh">
        <RotateCcw size={18} color="white" />
      </button>
      <img src={Gemini} alt="" width={90} />
      <div className="suggestion-title">
        <h4>Outfit Suggestion by Gemini:</h4>
      </div>
      {isLoading ? (
        <div>hshs</div>
      ) : (
        <div className="suggestion-box">
          <ul>
            {suggestions.map((suggestion, i) => (
              <li key={i}>{`${i + 1}. ${suggestion}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuggestCard;
