import axios from 'axios';
import { FetchFilmResponse } from './fetchFilm.d';

const fetchFilm = async (id: number): Promise<FetchFilmResponse> => {
  const apiKey = import.meta.env.VITE_APP_API_KEY as string;
  const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      'X-API-KEY': apiKey,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching film data', error);
    throw error;
  }
};

export default fetchFilm;
