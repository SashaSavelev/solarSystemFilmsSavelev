import axios from 'axios';
import { FetchDataResponse, Params } from './fetchData.d';
import { FilterProps } from '../types';

const fetchData = async (page: number, filteredQuery: FilterProps|null): Promise<FetchDataResponse> => {
    const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie';
    const apiKey = import.meta.env.VITE_APP_API_KEY as string;
    const fixedParams: Params = {
        limit: 50,
        selectFields: ['name', 'id', 'year', 'rating', 'genres', 'poster'],
        notNullFields: ['rating.kp', 'name', 'year'],
        'rating.kp': '1-10'
    };

    const params = { ...fixedParams, ...filteredQuery, page };

    const queryString = Object.keys(params)
        .map(key => {
            const value = params[key as keyof Params | 'page'];
            if (Array.isArray(value)) {
                return value.map(item => `${key}=${encodeURIComponent(item)}`).join('&');
            }
            return `${key}=${encodeURIComponent(value)}`;
        })
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
        console.error('Ошибка при загрузке данных', error);
        throw error;
    }
};

export default fetchData;
