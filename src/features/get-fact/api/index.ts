const fetchFact = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

export default fetchFact;
