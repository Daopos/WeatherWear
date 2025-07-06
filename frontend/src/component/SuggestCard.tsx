import "./SuggestCard.css";

import Gemini from "../assets/gemini.png";
import GeminiIcon from "../assets/geministart.png";
import { RotateCcw, Sun, Wind, Cloud, Droplets } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { getSuggestion } from "../services/service";
import { BarLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

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

  const getData = async (): Promise<void> => {
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

  const handleReset = (): void => {
    getData();
  };

  return (
    <div className="suggest-card">
      <button className="refresh" onClick={handleReset}>
        <RotateCcw size={18} color="white" />
      </button>
      <img src={Gemini} alt="" width={90} />
      <div className="suggestion-title">
        <h4>Outfit Suggestion by Gemini:</h4>
      </div>
      {isLoading ? (
        <div
          style={{
            height: 200,
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
