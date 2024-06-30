import React, { useEffect, useState } from 'react';
import fetchFilmsGenres from '../utils/fetchFilmsGenres';
import { Genre } from '../types';

interface FilmesGenresProps {
    selectedGenres: string[] | null;
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const FilmesGenres: React.FC<FilmesGenresProps> = ({ selectedGenres, setSelectedGenres }) => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const cachedGenres = localStorage.getItem('genres');
                if (cachedGenres) {
                    setGenres(JSON.parse(cachedGenres));
                } else {
                    const genresData = await fetchFilmsGenres();
                    setGenres(genresData);
                    localStorage.setItem('genres', JSON.stringify(genresData));
                }
            } catch (error) {
                console.error('Ошибка при загрузке жанров:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreClick = (genre: string) => {
        if (!selectedGenres) return;

        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="m-1">
            <p className="text-lg font-bold text-center p-2 m-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">Избранные фильмы</span>
            </p>

            <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                    <button
                        type="button"
                        key={genre.slug}
                        className={`flex text-sm sm:inline-flex bg-gradient-to-tr from-red-600 to-orange-400 ${
                            !selectedGenres || (!selectedGenres.includes(genre.name) && 'hover:from-red-800 hover:to-orange-600')
                        } active:from-red-800 active:to-orange-600 focus-visible:ring ring-red-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 sm:px-3 sm:py-2 px-2 py-1 overflow-hidden whitespace-nowrap text-ellipsis ${
                            selectedGenres && selectedGenres.includes(genre.name) ? 'bg-gray-900 from-red-900 to-orange-950 ' : ''
                        }`}
                        onClick={() => handleGenreClick(genre.name)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilmesGenres;
