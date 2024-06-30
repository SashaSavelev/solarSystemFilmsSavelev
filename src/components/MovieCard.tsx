import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import defaultPoster from '../assets/defaultPoster.webp';


interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, name, year, rating, poster, genres } = movie;
  const posterUrl = poster?.url || defaultPoster;
  const navigate = useNavigate();

  const isMovieLiked = (id: number): boolean => {
    const likedMovies: Movie[] = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    return likedMovies.some((movie) => movie.id === id);
  };

  const [isLiked, setIsLiked] = useState(isMovieLiked(id));

  useEffect(() => {
    setIsLiked(isMovieLiked(id));
  }, [id]);

  const handleLikeClick = () => {
    const likedMovies: Movie[] = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    let updatedLikedMovies;

    if (isLiked) {
      updatedLikedMovies = likedMovies.filter((likedMovie) => likedMovie.id !== id);
    } else {
      updatedLikedMovies = [...likedMovies, movie];
    }

    localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
    setIsLiked(!isLiked);
  };

  const handleViewFilm = () => {
    localStorage.setItem('detailedFilm', id.toString()); 

    navigate('/detailed');
  };

  return (
    <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-700 text-white h-full transform transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full h-96">
        <img className="w-full h-full object-cover" src={posterUrl} alt={name} />
      </div>
      <div className="px-6 py-4 h-28 cursor-pointer" onClick={handleViewFilm}>
        <div className="font-bold text-lg mb-2 line-clamp-2 hover:text-yellow-400">{name}</div>
        <p className="text-gray-400 text-sm">{year}</p>
        <div className="flex items-center mt-2">
          <div className="text-xs text-yellow-400">
            KP: {rating.kp}
          </div>
        </div>
      </div>
      <div className="px-4 pt-4 mx-3">
        {genres.map((genre, index) => (
          <span
            key={index}
            className="inline-block bg-gray-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-300 mr-2 mb-2"
          >
            {genre.name}
          </span>
        ))}
      </div>
      <button
        onClick={handleLikeClick}
        className="absolute bottom-2 right-1 text-white focus:outline-none"
        aria-label="like"
      >
        <FaHeart className={`text-3xl m-1 hover:text-gray-300 ${isLiked ? 'hover:text-red-300 text-red-500' : 'text-gray-500'}`} />
      </button>
    </div>
  );
};

export default MovieCard;
