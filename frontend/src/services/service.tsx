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
