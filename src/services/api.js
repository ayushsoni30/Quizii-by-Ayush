import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchCategories = async (retries = 3) => {
  try {
    const response = await axios.get("/api/categories");
    console.log(response);
    return response.data.trivia_categories; //gives category
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(
        "Rate limited (429) fetching categories. Retrying in 2 seconds...",
      );
      await delay(2000);
      return fetchCategories(retries - 1);
    }
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchQuestions = async (
  amount = 10,
  categoryId = null,
  difficulty = null,
  retries = 3,
) => {
  try {
    let url = `/api/questions?amount=${amount}&type=multiple`;
    if (categoryId) url += `&category=${categoryId}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    const response = await axios.get(url);

    // OpenTDB returns response_code 5 for rate limits
    if (response.data.response_code !== 0) {
      if (response.data.response_code === 5 && retries > 0) {
        console.warn(
          "Rate limited (code 5) fetching questions. Retrying in 3 seconds...",
        );
        await delay(3000);
        return fetchQuestions(amount, categoryId, difficulty, retries - 1);
      }
      throw new Error(
        "Could not fetch questions for these settings. Try again.",
      );
    }
    return response.data.results;
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(
        "Rate limited (429) fetching questions. Retrying in 3 seconds...",
      );
      await delay(3000);
      return fetchQuestions(amount, categoryId, difficulty, retries - 1);
    }
    console.error("Error fetching questions:", error);
    throw new Error(
      error.response?.status === 429
        ? "Too many requests to the Trivia API. Please wait a moment and try again."
        : error.message,
    );
  }
};
