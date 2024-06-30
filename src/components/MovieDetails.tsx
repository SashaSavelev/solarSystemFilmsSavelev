import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetchFilm from '../utils/fetchFilm';
import { FetchFilmResponse } from '../utils/fetchFilm.d';
import DetailedMovieCard from './MovieCardDetailed';
import detailedBackground from '../assets/detailedBackground.jpeg';
import { CircularProgress } from '@mui/material';

const MovieDetails: React.FC = () => {
    const [movieId, setMovieId] = useState<number | null>(null);

    useEffect(() => {
        const storedMovieId = localStorage.getItem('detailedFilm');
        if (storedMovieId) {
            setMovieId(Number(storedMovieId));
        }
    }, []);

    const { data, error, isLoading } = useQuery<FetchFilmResponse, Error>(
        [ movieId],
        () => fetchFilm(movieId!),
        {
            enabled: !!movieId,
        }
    );

    useEffect(() => {
        if (data) {
            console.log('Fetched Movie Details:', data);
        }
    }, [data]);

    return (
        <div
            className="flex flex-col items-center bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg text-white min-h-screen px-4 py-4 mt-20 bg-center bg-cover"
            style={{ backgroundImage: `url(${detailedBackground})` }}
        >
            {isLoading && (
                <div className="flex items-center justify-center gap-5">
                    <CircularProgress />
                    <span className="ml-2 text-3xl text-white mt-9 font-semibold">Загрузка...</span>
                </div>
            )}
            <div className="flex flex-col items-center w-full max-w-screen-lg rounded-3xl shadow-md">
                {data ? <DetailedMovieCard movie={data} /> : <div></div>}
            </div>
        </div>
    );
};

export default MovieDetails;
