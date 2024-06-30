import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';
import { FetchDataResponse } from '../utils/fetchData.d';
import { CircularProgress } from '@mui/material';

interface FilmsProps {
  data: FetchDataResponse | undefined;
  error: Error | null;
  isLoading: boolean;
}

const Films: React.FC<FilmsProps> = ({ data, error, isLoading }) => {
  const handleMovieClick = (id: number) => {
    console.log(`Clicked movie with id ${id}`);
  };

  return (
<div className="flex justify-center items-center px-4 lg:py-0 py-4"> 
      {isLoading && (
        <div className="flex items-center justify-center gap-5">
          <CircularProgress />
          <span className="ml-2 text-3xl text-white mt-9  font-semibold">Загрузка...</span>
        </div>
      )}

      {error && (
        <span className="ml-2 text-3xl text-gray-400  font-semibold">Ошибка при загрузке фильмов: {error.message}.</span>

      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.docs.length ? (
            data.docs.map((movie: Movie) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <div>Нет данных</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Films;
