import axios from "axios";

const fetchPredictedAge = async (name: string, signal: AbortSignal): Promise<number> => {
  const { data } = await axios.get(
    `https://api.agify.io?name=${name}`, {
    signal
  })
  return data.age;
}

export default fetchPredictedAge;