import axios from "axios";

const fetchFact = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await axios.get("https://catfact.ninja/fact");
  return data.fact;
};

export default fetchFact;
