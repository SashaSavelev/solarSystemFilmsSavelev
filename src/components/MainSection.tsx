import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Films from './Films';
import { useQuery } from 'react-query';
import fetchData from '../utils/fetchData';
import { FetchDataResponse } from '../utils/fetchData.d';
import Paginator from './Paginator';
import { FilterProps } from '../types';
import backgroundImage from '../assets/background.avif';

interface MainSectionProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    filteredQuery: FilterProps | null;
    setFilteredQuery: React.Dispatch<React.SetStateAction<FilterProps | null>>;
    resetFilters: () => void;
}

const MainSection: React.FC<MainSectionProps> = ({ currentPage, setCurrentPage, filteredQuery, setFilteredQuery, resetFilters }) => {
    const [numberOfPages, setNumberOfPages] = useState<number | null>(null);

    const { data, error, isLoading } = useQuery<FetchDataResponse, Error>([currentPage, filteredQuery], () => fetchData(currentPage, filteredQuery));

    useEffect(() => {
        if (data) {
            setNumberOfPages(data.pages);
        }
    }, [data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main
            className="flex flex-col lg:flex-row min-h-screen justify-center items-start mt-20 p-8"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="w-full lg:w-1/4 p-3 mt-5 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-3xl shadow-md">
                <Filter setFilteredQuery={setFilteredQuery} setCurrentPage={setCurrentPage} resetFilters={resetFilters} />
            </div>
            <div className="flex-1 mt-5">
                <Films data={data} error={error} isLoading={isLoading} />
                <div className="flex justify-center m-5 w-full p-2">
                    {numberOfPages && (
                        <Paginator isLoading={isLoading} numberOfPages={numberOfPages} currentPage={currentPage} onPageChange={handlePageChange} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default MainSection;
