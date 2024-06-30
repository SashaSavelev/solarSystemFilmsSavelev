import axios from 'axios';
import { Genre } from '../types';

const fetchFilmsGenres = async (): Promise<Genre[]> => {
    const baseUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field';
    const apiKey = import.meta.env.VITE_APP_API_KEY as string;

    const params = {
        field: 'genres.name',
    };

    const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key as keyof typeof params])}`)
        .join('&');

    const url = `${baseUrl}?${queryString}`;

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
        console.error('Error fetching genres', error);
        throw error;
    }
};

export default fetchFilmsGenres;
