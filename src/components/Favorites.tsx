import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import favoriteBackground from '../assets/favoriteBackground.jpeg';

const Favorites: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const likedMovies: Movie[] = JSON.parse(localStorage.getItem('likedMovies') || '[]');
        setFavoriteMovies(likedMovies);
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-4 mt-20 bg-center bg-cover"
            style={{ backgroundImage: `url(${favoriteBackground})` }}
        >
            {favoriteMovies.length > 0 ? (
                <div className="flex flex-col items-center bg-white bg-opacity-5 p-8  backdrop-filter backdrop-blur-lg rounded-3xl shadow-md">
                 
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-5 pb-4 relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">Избранные фильмы</span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto">
                        {favoriteMovies.map((movie: Movie) => (
                            <div key={movie.id}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-white text-2xl">Нет избранных фильмов</p>
            )}
        </div>
    );
};

export default Favorites;
