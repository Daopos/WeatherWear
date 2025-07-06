export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    cloud: number;
    heatindex_c: number;
    is_day: number;
  };
}

export const getWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await fetch("http://localhost:3000/weather");
    if (!response.ok) throw new Error("HTTP error!");

    const data: WeatherData = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};

export const getSuggestion = async () => {
  try {
    const response = await fetch("http://localhost:3000/gemini");

    if (!response.ok) {
      throw new Error("HTTP error!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
