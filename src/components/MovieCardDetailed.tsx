import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchFilmResponse, Person, Genre } from '../utils/fetchFilm.d';
import { FaArrowLeft, FaHeart } from 'react-icons/fa'; 
import defaultPoster from '../assets/defaultPoster.webp';

interface DetailedMovieCardProps {
    movie: FetchFilmResponse;
}

const DetailedMovieCard: React.FC<DetailedMovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const { id, name, rating, poster, description, year, persons, genres } = movie;
    const posterUrl = poster?.url || defaultPoster;

    const isMovieLiked = (id: number): boolean => {
        const likedMovies: FetchFilmResponse[] = JSON.parse(localStorage.getItem('likedMovies') || '[]');
        return likedMovies.some((movie) => movie.id === id);
    };

    const [isLiked, setIsLiked] = useState(isMovieLiked(id));

    useEffect(() => {
        setIsLiked(isMovieLiked(id));
    }, [id]);

    const handleLikeClick = () => {
        const likedMovies: FetchFilmResponse[] = JSON.parse(localStorage.getItem('likedMovies') || '[]');
        let updatedLikedMovies;

        if (isLiked) {
            updatedLikedMovies = likedMovies.filter((likedMovie) => likedMovie.id !== id);
        } else {
            updatedLikedMovies = [...likedMovies, movie];
        }

        localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
        setIsLiked(!isLiked);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="mt-9 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-md p-8 sm:p-16 relative">
            <button
                onClick={handleGoBack}
                className="absolute top-0 right-0 flex items-center bg-blue-800 px-4 py-2 text-white rounded-2xl hover:bg-blue-700 opacity-50 focus:outline-none"
            >
                <FaArrowLeft className="mr-2" />Назад
            </button>
            <div className="flex flex-col sm:flex-row justify-center items-center m-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold rounded-2xl text-center text-white">
                    {name}
                </h1>
            </div>
            <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col">
                    <img
                        src={posterUrl}
                        alt={name}
                        className="w-full sm:w-64 h-96 object-cover rounded-lg shadow-md mb-4 sm:mr-4"
                    />
                    <div className="mt-3">
                        <p>
                            <strong className='text-yellow-300'>Рейтинг КП:</strong>{' '}
                            {rating.kp ? rating.kp.toFixed(2) : 'Информация отсутствует'}
                        </p>
                        <p className='my-3'>
                            <strong className='text-yellow-300'>Рейтинг IMDB:</strong>{' '}
                            {rating.imdb ? rating.imdb.toFixed(2) : 'Информация отсутствует'}
                        </p>
                    </div>
                </div>
                <div className="flex-1 mt-4 sm:ml-4">
                    <p className="mb-4">
                        <strong className='text-yellow-300'>Описание:</strong> {description || 'Информация отсутствует'}
                    </p>
                    <p className="mb-4">
                        <strong className='text-yellow-300'>Год:</strong> {year || 'Информация отсутствует'}
                    </p>
                    <div>
                        <h2 className="font-bold mb-2 text-yellow-300">Список Жанров:</h2>
                        <p>
                            {genres.length > 0
                                ? genres.map((genre: Genre) => genre.name).join(', ')
                                : 'Информация отсутствует'}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-yellow-300">Актеры:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {persons
                        .filter((person: Person) => person.name)
                        .map((person: Person, index: number) => (
                            <div
                                key={`${person.id}_${index}`}
                                className="flex items-center mb-4"
                            >
                                <img
                                    src={person.photo}
                                    alt={person.name}
                                    className="w-12 h-12 object-cover rounded-full mr-2"
                                />
                                <p>{person.name}</p>
                            </div>
                        ))}
                </div>
            </div>
            <button
                onClick={handleLikeClick}
                className="absolute top-2 left-2 text-white focus:outline-none"
                aria-label="like"
            >
                <FaHeart className={`text-3xl m-1 hover:text-gray-300 ${isLiked ? 'hover:text-red-300 text-red-500' : 'text-gray-500'}`} />
            </button>
        </div>
    );
};

export default DetailedMovieCard;
