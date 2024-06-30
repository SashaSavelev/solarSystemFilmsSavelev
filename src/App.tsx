import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';
import { FilterProps } from './types';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const storedPage = localStorage.getItem('currentPage');
        return storedPage ? Number(storedPage) : 1;
    });
    const [filteredQuery, setFilteredQuery] = useState<FilterProps | null>(() => {
        const storedQuery = localStorage.getItem('filteredQuery');
        return storedQuery ? JSON.parse(storedQuery) : null;
    });

    useEffect(() => {
        localStorage.setItem('currentPage', String(currentPage));
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('filteredQuery', JSON.stringify(filteredQuery));
    }, [filteredQuery]);

    const navigate = useNavigate();

    const resetFilters = () => {
        setFilteredQuery(null);
        setCurrentPage(1);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-black">
                <Header />
                <Routes>
                    <Route path="/" element={<MainSection currentPage={currentPage} setCurrentPage={setCurrentPage} filteredQuery={filteredQuery} setFilteredQuery={setFilteredQuery} resetFilters={resetFilters} />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/detailed" element={<MovieDetails />} />
                </Routes>
            </div>
        </QueryClientProvider>
    );
};

export default App;
