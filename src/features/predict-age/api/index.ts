const fetchPredictedAge = async (name: string): Promise<number> => {
  const response = await fetch(`https://api.agify.io?name=${name}`);
  const data = await response.json();
  return data.age;
}

export default fetchPredictedAge;