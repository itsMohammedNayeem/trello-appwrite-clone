import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestions = async (board: Board) => {
  const todos = formatTodosForAI(board);

  const res = await fetch("api/generateSummary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todos }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const text = await res.text();
  if (!text) {
    throw new Error("No content received from server");
  }

  const GPTdata = JSON.parse(text);
  const { content } = GPTdata;

  return content;
};

export default fetchSuggestions;
