// MarvelAPI.js
import axios from "axios";
import md5 from "md5";

const PUBLIC_KEY = 'cdd2181260107104743bd6ef1cbb0565';
const PRIVATE_KEY =  'c6436ae6be07c0756c172ec10898ae2030054f7f';
const BASE_URL = "https://gateway.marvel.com/v1/public/characters";

const generateHash = (timestamp) => {
  return md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
};

const getCharacters = async (offset = 0, limit = 20) => {
  const timestamp = Date.now();
  const hash = generateHash(timestamp);
  const params = {
    apikey: PUBLIC_KEY,
    ts: timestamp,
    hash,
    limit,
    offset,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

const getCharacterById = async (id) => {
  const timestamp = Date.now();
  const hash = generateHash(timestamp);
  const params = {
    apikey: PUBLIC_KEY,
    ts: timestamp,
    hash,
  };

  try {
    const response = await axios.get(`${BASE_URL}/${id}`, { params });
    return response.data.data.results[0];
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
};

export default {
  getCharacters,
  getCharacterById,
};
