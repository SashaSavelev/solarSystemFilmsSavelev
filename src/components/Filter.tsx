import React, { useState, useEffect } from 'react';
import FilmesGenres from './FilmsGenres';
import RangeSlider from './RangeSlider';
import { FilterProps } from '../types';

interface FilteringProps {
    setFilteredQuery: React.Dispatch<React.SetStateAction<FilterProps | null>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    resetFilters: () => void;
}

const Filter: React.FC<FilteringProps> = ({ setFilteredQuery, setCurrentPage, resetFilters }) => {
    const [selectedGenres, setSelectedGenres] = useState<string[] | null>(() => {
        const storedGenres = localStorage.getItem('selectedGenres');
        return storedGenres ? JSON.parse(storedGenres) : null;
    });

    const [ratingRange, setRatingRange] = useState<[number, number] | null>(() => {
        const storedRatingRange = localStorage.getItem('ratingRange');
        return storedRatingRange ? JSON.parse(storedRatingRange) : null;
    });

    const [yearsRange, setYearsRange] = useState<[number, number] | null>(() => {
        const storedYearsRange = localStorage.getItem('yearsRange');
        return storedYearsRange ? JSON.parse(storedYearsRange) : null;
    });

    useEffect(() => {
        localStorage.setItem('selectedGenres', selectedGenres ? JSON.stringify(selectedGenres) : '');
        localStorage.setItem('ratingRange', ratingRange ? JSON.stringify(ratingRange) : '');
        localStorage.setItem('yearsRange', yearsRange ? JSON.stringify(yearsRange) : '');        
    }, [selectedGenres, ratingRange, yearsRange]);

    const resetValues = () => {
        setSelectedGenres(null);
        setRatingRange(null);
        setYearsRange(null);
        localStorage.removeItem('selectedGenres');
        localStorage.removeItem('ratingRange');
        localStorage.removeItem('yearsRange');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let filterProps: FilterProps = {};

        if (selectedGenres && selectedGenres.length > 0) {
            filterProps['genres.name'] = selectedGenres;
        }

        if (ratingRange) {
            const [minRating, maxRating] = ratingRange;
            filterProps['rating.kp'] = minRating === maxRating ? `${minRating}` : `${minRating}-${maxRating}`;
        }

        if (yearsRange) {
            const [minYear, maxYear] = yearsRange;
            filterProps['year'] = minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
        }

        setFilteredQuery(Object.keys(filterProps).length === 0 ? null : filterProps);
        setCurrentPage(1);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    resetFilters();
                    resetValues();
                }}
                className="absolute top-1 right-1 p-2 text-white text-2xl"
                title="Сбросить все фильтры"
                style={{ pointerEvents: 'auto' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                        fillRule="evenodd"
                        d="M6.225 4.811a.75.75 0 011.06 0L12 9.524l4.715-4.713a.75.75 0 111.06 1.06L13.062 10.5l4.713 4.715a.75.75 0 01-1.06 1.06L12 11.538l-4.715 4.713a.75.75 0 11-1.06-1.06L10.938 10.5 6.225 5.775a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <FilmesGenres selectedGenres={selectedGenres ?? []} setSelectedGenres={setSelectedGenres} />
                <RangeSlider min={1} max={10} range={ratingRange} setRange={setRatingRange} label="Рейтинг Кинопоиска" step={0.1} />
                <RangeSlider min={1990} max={new Date().getFullYear()} range={yearsRange} setRange={setYearsRange} label="Год выпуска" step={1} />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-gradient-to-tr from-black to-red-900 text-white rounded-md font-semibold text-center outline-none transition duration-100 hover:bg-gradient-to-tr hover:from-red-800 hover:to-orange-600 active:from-red-800 active:to-orange-600 focus-visible:ring ring-red-300 sm:px-3 sm:py-2 sm:inline-flex overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    Начать поиск
                </button>
            </form>
        </div>
    );
};

export default Filter;
